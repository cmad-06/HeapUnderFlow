package com.learning.cmad.blog.api;

import java.util.List;

public interface BlogInterface {

		//Create
		public Blog createBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException;
		
		//Read
		public List<Blog> getAllBlogs() throws BlogException;
		public List<Blog> getAllBlogsPagination(int limit, int start);
		
		public Blog getBlogById(String id) throws BlogNotFoundException, BlogException;
		
		//Update
		public void updateBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException;
		
		//Delete
		public void deleteBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException;
		public void deleteBlogById(String id) throws InvalidBlogException, DuplicateBlogException, BlogException;
		
		//Search
		List<Blog> searchBlogs(String query) throws BlogException;
}
