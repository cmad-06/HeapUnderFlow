package com.learning.cmad.user.api;

import java.util.List;

import javax.persistence.CascadeType;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.OneToMany;

import com.learning.cmad.blog.api.Blog;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity
public class User {


	//---------------------------------------------------------------------------
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private String userId;
	private String firstName;
	private String lastName;
	private String username;
	private String email;
	private String password;
	private List<String> userBlogIds;

	//---------------------------------------------------------------------------

	public List<String> getUserBlogs() {
		return userBlogIds;
	}


	public void setUserBlogs(List<String> userBlogs) {
		this.userBlogIds = userBlogs;
	}


	public User(){

	}


	//---------------------------------------------------------------------------

	public User(String userId, String userName){
		this.userId = userId;
		this.username = userName;
	}

	//---------------------------------------------------------------------------

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
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
