package com.learning.cmad.user.biz;

import java.util.List;
import java.util.Map;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.blog.data.BlogDAO;
import com.learning.cmad.blog.data.JPABlogDAO;
import com.learning.cmad.user.api.AuthenticationException;
import com.learning.cmad.user.api.BlogUser;
import com.learning.cmad.user.api.DuplicateUserException;
import com.learning.cmad.user.api.InvalidUserException;
import com.learning.cmad.user.api.User;
import com.learning.cmad.user.api.UserException;
import com.learning.cmad.user.api.UserNotFoundException;
import com.learning.cmad.user.data.JPAUserDAO;
import com.learning.cmad.user.data.UserDAO;
import com.learning.cmad.utils.EncryptorDecryptor;


public class SimpleBlogUser implements BlogUser {

	private UserDAO userDAO = new JPAUserDAO();
	private BlogDAO blogDAO = new JPABlogDAO();

	
	@Override
	public int createUser(User user) throws InvalidUserException, DuplicateUserException, UserException {

		if(user == null || user.getUsername().trim().length() == 0)
			throw new InvalidUserException();
		
		return userDAO.createUser(user);
	}

	@Override
	public List<User> getAllUsers() throws UserException {
		List<User> users = userDAO.getAllUsers();
		return users;
	}

	@Override
	public User getUserById(int id) throws UserNotFoundException, UserException {
		User user = userDAO.getUserById(id);
		return user;
	}

	@Override
	public void updateUser(User user) throws InvalidUserException, UserNotFoundException, UserException {
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
	public void deleteUserById(int id) throws InvalidUserException, UserNotFoundException, UserException {
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
	public void addBlogForUser(Blog blog, int userId) throws UserNotFoundException, UserException {
		userDAO.addBlogForUser(blog, userId);
	}
}
