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
import com.learning.cmad.user.api.InvalidUserException;
import com.learning.cmad.user.data.UserDAO;
import com.learning.cmad.utils.Databasehandler;
import com.mongodb.MongoClient;

public class SimpleBlog implements BlogInterface{

	Datastore datastore = Databasehandler.getMongoDatastore();
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
		
		Blog blog = dao.getBlogById(id);
		int blogViews = blog.getBlogViews();
		blog.setBlogViews(blog.getBlogViews()+1);
		this.updateBlog(blog);
		return blog;
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

	@Override
	public List<Blog> searchBlogs(String field, String query) throws BlogException {
		return dao.searchBlogForField(field, query);
	}

}
