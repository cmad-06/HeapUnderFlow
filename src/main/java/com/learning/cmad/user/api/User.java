package com.learning.cmad.user.api;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.learning.cmad.blog.api.Blog;

@Entity
public class User {


	//---------------------------------------------------------------------------
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int userId;
	private String firstName;
	private String lastName;
	private String username;
	private String email;
	private String password;
	
	@OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	private List<Blog> userBlogs;

	//---------------------------------------------------------------------------

	public List<Blog> getUserBlogs() {
		return userBlogs;
	}


	public void setUserBlogs(List<Blog> userBlogs) {
		this.userBlogs = userBlogs;
	}


	public User(){

	}


	//---------------------------------------------------------------------------

	public User(int userId, String userName){
		this.userId = userId;
		this.username = userName;
	}

	//---------------------------------------------------------------------------

	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}


	//---------------------------------------------------------------------------


}
