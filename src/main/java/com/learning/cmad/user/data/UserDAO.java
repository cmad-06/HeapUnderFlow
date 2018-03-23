package com.learning.cmad.user.data;

import java.util.List;


import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.user.api.User;

public interface UserDAO {

	//Create
	public String createUser(User user);
	
	//Read
	public List<User> getAllUsers();
	public User getUserById(String id);
	
	//Update
	public void updateUser(User user);
	
	
	//Delete
	public void deleteUser(User user);
	public void deleteUserById(String id);

	public User getUserByKey(String key, String Value);
	
	
	//public void addBlogForUser(Blog blog, String userId);

	public List<String> getBlogsForUser(String userId);
}
