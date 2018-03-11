package com.learning.cmad.user.api;

import java.util.List;
import java.util.Map;

public interface BlogUser {

	//Create
	public int createUser(User user) throws InvalidUserException, DuplicateUserException, UserException;
	
	//Read
	public List<User> getAllUsers() throws UserException;
	public User getUserById(int id) throws UserNotFoundException, UserException;
	
	//Update
	public void updateUser(User user) throws InvalidUserException, UserNotFoundException, UserException;
	
	//Delete
	public void deleteUser(User user) throws InvalidUserException, UserNotFoundException, UserException;
	public void deleteUserById(int id) throws InvalidUserException, UserNotFoundException, UserException;

	public User loginUser(Map map) throws UserNotFoundException, AuthenticationException, UserException;

	public User getUserByKey(String string, String username) throws UserNotFoundException, UserException;
	
}
