package com.learning.cmad.blog.api;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.learning.cmad.utils.CustomerDateAndTimeDeserialize;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity
public class Blog {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private String blogId;
	private String blogTitle;
	private String blogAuthor;
	private String blogText;
	
	public String getBlogText() {
		return blogText;
	}

	public void setBlogText(String blogText) {
		this.blogText = blogText;
	}
	@JsonDeserialize(using=CustomerDateAndTimeDeserialize.class)
	private Date blogCreation;
	private int blogLikes;
	
	public int getBlogLikes() {
		return blogLikes;
	}

	public void setBlogLikes(int blogLikes) {
		this.blogLikes = blogLikes;
	}

	public Blog(){
		
	}
	
	public String getBlogId() {
		return blogId;
	}
	public void setBlogId(String string) {
		this.blogId = string;
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
