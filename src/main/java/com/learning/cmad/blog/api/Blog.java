package com.learning.cmad.blog.api;

import java.util.Date;


public class Blog {

	private int blogId;
	private String blogTitle;
	private String blogAuthor;
	private int blogAuthorId;
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
	public int getBlogAuthorId() {
		return blogAuthorId;
	}
	public void setBlogAuthorId(int blogAuthorId) {
		this.blogAuthorId = blogAuthorId;
	}
	public Date getBlogCreation() {
		return blogCreation;
	}
	public void setBlogCreation(Date blogCreation) {
		this.blogCreation = blogCreation;
	}
	
}
