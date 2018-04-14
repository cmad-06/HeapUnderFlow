package com.learning.cmad.user.data;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.user.api.User;
import com.learning.cmad.user.api.UserNotFoundException;
import com.learning.cmad.utils.EncryptorDecryptor;

import org.mongodb.morphia.query.Query;
import org.mongodb.morphia.query.UpdateOperations;

import com.mongodb.MongoClient;

public class MorphiaUserDAO extends BasicDAO<User, String> implements UserDAO  {
	
	public MorphiaUserDAO(Class entityClass, Datastore ds) {
		super(entityClass, ds);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String createUser(User user) {
		save(user);
		return user.getUserId();
	}

	@Override
	public List<User> getAllUsers() {
		List<User> users = createQuery().asList();
		return users;
	}

	@Override
	public User getUserById(String id) {
		Query<User> query = createQuery().field("userId").equal(id);
		User user = query.get();
		if(user == null)
			throw new UserNotFoundException();
		return user;
		
	}

	@Override
	public void updateUser(User user) {
		System.out.println("Updating Data for user");
	/*	Query query = createQuery().field("userId").equal(user.getUserId());
		UpdateOperations<User> ops = createUpdateOperations().set
		updateFirst(User,  ops);*/
		save(user);
		
	}
	

	@Override
	public void deleteUser(User user) {
		delete(user);
	}

	@Override
	public void deleteUserById(String id) {
		Query<User> query = createQuery().field("userId").equal(id);
		User user = query.get();
		if(user == null)
			throw new UserNotFoundException();
		
		 delete(user);
		
	}

	@Override
	public User getUserByKey(String key, String value) {
		
		Query<User> query = createQuery().field(key).equal(value);
		return query.get();
		
	}
/*
	@Override
	public void addBlogForUser(Blog blog, String userId) {
		Query<User> query = createQuery().field("userId").equal(userId);
		User user = query.get();
		System.out.println(user);
		
		
		save(user);
		
	}
*/

	@Override
	public List<String> getBlogsForUser(String userId) {
		Query<User> query = createQuery().field("userId").equal(userId);
		User user = query.get();
		if(user == null)
			throw new UserNotFoundException();
		
		return user.getUserBlogs();
	}
	
//----------------------------------------------------------------------------------------
	
	public boolean isValidUser(String username, String plainPassword){
		
		String encPassword = EncryptorDecryptor.encryptData(plainPassword);
		boolean isValid = false;
		Query<User> query = createQuery().field("username").equal(username).field("password").equal(encPassword);
		User user = query.get();
		if(user != null)
			isValid = true;
		
		return isValid;
	}

//----------------------------------------------------------------------------------------

}
