package com.learning.cmad.blog.api;

import java.util.List;

public interface BlogInterface {

		//Create
		public void createBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException;
		
		//Read
		public List<Blog> getAllBlogs() throws BlogException;
		public Blog getBlogById(int id) throws BlogNotFoundException, BlogException;
		
		//Update
		public void updateBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException;
		
		//Delete
		public void deleteBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException;
		public void deleteBlogById(int id) throws InvalidBlogException, DuplicateBlogException, BlogException;
}
