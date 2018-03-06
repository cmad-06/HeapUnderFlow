package com.learning.cmad.user.biz;

import java.util.List;

import com.learning.cmad.user.api.BlogUser;
import com.learning.cmad.user.api.DuplicateUserException;
import com.learning.cmad.user.api.InvalidUserException;
import com.learning.cmad.user.api.User;
import com.learning.cmad.user.api.UserException;
import com.learning.cmad.user.api.UserNotFoundException;
import com.learning.cmad.user.data.JPAUserDAO;
import com.learning.cmad.user.data.UserDAO;

public class SimpleBlogUser implements BlogUser {

	private UserDAO dao = new JPAUserDAO();
	
	@Override
	public void createUser(User user) throws InvalidUserException, DuplicateUserException, UserException {

		if(user == null || user.getUsername().trim().length() == 0)
			throw new InvalidUserException();
		
		dao.createUser(user);
	}

	@Override
	public List<User> getAllUsers() throws UserException {
		List<User> users = dao.getAllUsers();
		return users;
	}

	@Override
	public User getUserById(int id) throws UserNotFoundException, UserException {
		User user = dao.getUserById(id);
		return user;
	}

	@Override
	public void updateUser(User user) throws InvalidUserException, UserNotFoundException, UserException {
		dao.updateUser(user);
	}

	@Override
	public void deleteUser(User user) throws InvalidUserException, UserNotFoundException, UserException {
		dao.deleteUser(user);
	}

	@Override
	public void deleteUserById(int id) throws InvalidUserException, UserNotFoundException, UserException {
		dao.deleteUserById(id);
	}

	@Override
	public User getUserByUsername(String username) throws UserNotFoundException, UserException {
		return dao.getUserByUserName(username);
	}

}
