package com.learning.cmad.blog.biz;

import java.util.List;
import java.util.UUID;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.blog.api.BlogException;
import com.learning.cmad.blog.api.BlogInterface;
import com.learning.cmad.blog.api.BlogNotFoundException;
import com.learning.cmad.blog.api.DuplicateBlogException;
import com.learning.cmad.blog.api.InvalidBlogException;
import com.learning.cmad.blog.data.BlogDAO;
import com.learning.cmad.blog.data.MorphiaBlogDao;
import com.learning.cmad.user.data.UserDAO;
import com.mongodb.MongoClient;

public class SimpleBlog implements BlogInterface{
	
	MongoClient mongoClient = new MongoClient("0.0.0.0:27017");
	Morphia morphia = new Morphia();
	String databaseName = "heapunderflow";
	Datastore datastore = morphia.createDatastore(mongoClient, databaseName);

	private BlogDAO dao = new MorphiaBlogDao(Blog.class,datastore);

	@Override
	public Blog createBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException {
		blog.setBlogId(UUID.randomUUID().toString());
		dao.createBlog(blog);
		return blog;
	}

	@Override
	public List<Blog> getAllBlogs() throws BlogException {
		return dao.getAllBlogs();
	}

	@Override
	public Blog getBlogById(String id) throws BlogNotFoundException, BlogException {
		return dao.getBlogById(id);
	}

	

	@Override
	public void updateBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException {
		dao.updateBlog(blog);
	}

	@Override
	public void deleteBlog(Blog blog) throws InvalidBlogException, DuplicateBlogException, BlogException {
		dao.deleteBlog(blog);
		
	}

	@Override
	public void deleteBlogById(String id) throws InvalidBlogException, DuplicateBlogException, BlogException {
		dao.deleteBlogById(id);
		
	}

}
