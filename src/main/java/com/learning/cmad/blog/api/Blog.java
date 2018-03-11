package com.learning.cmad.blog.api;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Blog {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int blogId;
	private String blogTitle;
	private String blogAuthor;
	private Date blogCreation;
	
	public Blog(){
		
	}
	
	public int getBlogId() {
		return blogId;
	}
	public void setBlogId(int blogId) {
		this.blogId = blogId;
	}
	public String getBlogTitle() {
		return blogTitle;
	}
	public void setBlogTitle(String blogTitle) {
		this.blogTitle = blogTitle;
	}
	public String getBlogAuthor() {
		return blogAuthor;
	}
	public void setBlogAuthor(String blogAuthor) {
		this.blogAuthor = blogAuthor;
	}
	
	public Date getBlogCreation() {
		return blogCreation;
	}
	public void setBlogCreation(Date blogCreation) {
		this.blogCreation = blogCreation;
	}
	
}
