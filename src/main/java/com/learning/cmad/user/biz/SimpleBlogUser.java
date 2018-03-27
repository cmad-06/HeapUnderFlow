package com.learning.cmad.user.biz;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.blog.api.BlogInterface;
import com.learning.cmad.blog.biz.SimpleBlog;
import com.learning.cmad.blog.data.BlogDAO;
import com.learning.cmad.blog.data.MorphiaBlogDao;
import com.learning.cmad.user.api.AuthenticationException;
import com.learning.cmad.user.api.BlogUser;
import com.learning.cmad.user.api.DuplicateUserException;
import com.learning.cmad.user.api.InvalidUserException;
import com.learning.cmad.user.api.User;
import com.learning.cmad.user.api.UserException;
import com.learning.cmad.user.api.UserNotFoundException;

import com.learning.cmad.user.data.MorphiaUserDAO;
import com.learning.cmad.user.data.UserDAO;
import com.learning.cmad.utils.EncryptorDecryptor;
import com.mongodb.MongoClient;


public class SimpleBlogUser implements BlogUser {
	
	MongoClient mongoClient = new MongoClient("0.0.0.0:27017");
	Morphia morphia = new Morphia();
	String databaseName = "heapunderflow";
	Datastore datastore = morphia.createDatastore(mongoClient, databaseName);

	private UserDAO userDAO = new MorphiaUserDAO(User.class,datastore);
//	private UserDAO userDAO = new JPAUserDAO();
	private BlogInterface blogIface = new SimpleBlog();

	
	@Override
	public String createUser(User user) throws InvalidUserException, DuplicateUserException, UserException {

		if(user == null || user.getUsername().trim().length() == 0)
			throw new InvalidUserException();
		user.setUserId(UUID.randomUUID().toString());
		return userDAO.createUser(user);
	}

	@Override
	public List<User> getAllUsers() throws UserException {
		List<User> users = userDAO.getAllUsers();
		return users;
	}

	@Override
	public User getUserById(String id) throws UserNotFoundException, UserException {
		User user = userDAO.getUserById(id);
		return user;
	}

	@Override
	public void updateUser(User user) throws InvalidUserException, UserNotFoundException, UserException {
		System.out.println("SimpleBlogUser Update User");
		if (user.getClass() != null) {
			String sentPassword = EncryptorDecryptor.encryptData(user.getPassword());
			User StoredUser = userDAO.getUserById(user.getUserId());
			if ( sentPassword != StoredUser.getPassword()) {
				user.setPassword(sentPassword);
			}
		}
		userDAO.updateUser(user);
		
	}

	@Override
	public void deleteUser(User user) throws InvalidUserException, UserNotFoundException, UserException {
		userDAO.deleteUser(user);
	}

	@Override
	public void deleteUserById(String id) throws InvalidUserException, UserNotFoundException, UserException {
		userDAO.deleteUserById(id);
	}
	
	
	@Override
	public User loginUser(Map map) throws UserNotFoundException , AuthenticationException, UserException{
		User user = userDAO.getUserByKey("username", (String) map.get("username"));
		String sentPassword = EncryptorDecryptor.encryptData((String) map.get("password"));
		if (sentPassword.equals(user.getPassword())) {
				return user;
		}
		else {
			throw new AuthenticationException();
		}
	}

	@Override
	public User getUserByKey(String key, String username) throws UserNotFoundException, UserException{
		User user = userDAO.getUserByKey(key, username);
		return user;
	}

	@Override
	public void addBlogForUser(Blog blog, String userId) throws UserNotFoundException, UserException {
		User user = userDAO.getUserById(userId);
		Blog createdblog = blogIface.createBlog(blog);
		List<String> currentBlogIds = user.getUserBlogs();
		if ( currentBlogIds != null) {
		currentBlogIds.add(blog.getBlogId());
		}
		else {
			List<String> blogIds = new ArrayList<String>(); 
			blogIds.add(createdblog.getBlogId());
			user.setUserBlogs(blogIds);
		}
		userDAO.updateUser(user);
	}

	@Override
	public List<Blog> getBlogsForUser(String userId) {
		User user = userDAO.getUserById(userId);
		List<Blog> blogs = new ArrayList<Blog>();
		user.getUserBlogs().forEach(blogID->{
			blogs.add(blogIface.getBlogById(blogID));
		});
		
		return blogs;
	}
}
