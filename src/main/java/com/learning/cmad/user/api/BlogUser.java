package com.learning.cmad.user.api;

import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;

import com.learning.cmad.blog.api.Blog;

public interface BlogUser {

	//Create
	public String createUser(User user) throws InvalidUserException, DuplicateUserException, UserException;
	
	//Read
	public List<User> getAllUsers() throws UserException;
	public User getUserById(String id) throws UserNotFoundException, UserException;
	
	//Update
	public void updateUser(User user) throws InvalidUserException, UserNotFoundException, UserException;
	
	//Delete
	public void deleteUser(User user) throws InvalidUserException, UserNotFoundException, UserException;
	public void deleteUserById(String id) throws InvalidUserException, UserNotFoundException, UserException;

	public User loginUser(Map map) throws UserNotFoundException, AuthenticationException, UserException;

	public User getUserByKey(String string, String username) throws UserNotFoundException, UserException;
	
	public void addBlogForUser(Blog blog, String userId) throws UserNotFoundException, UserException;
	
	public void deleteUserBlogById(String userId, String blogId) throws UserException;

	public List<Blog> getBlogsForUser(String userId);
	
}
