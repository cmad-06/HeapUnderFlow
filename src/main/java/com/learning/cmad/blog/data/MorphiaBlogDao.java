package com.learning.cmad.blog.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.blog.api.BlogException;
import com.learning.cmad.blog.api.BlogNotFoundException;
import com.learning.cmad.blog.api.DuplicateBlogException;

public class MorphiaBlogDao extends BasicDAO<Blog, String> implements BlogDAO{
	
	public MorphiaBlogDao(Class entityClass, Datastore ds) {
		super(entityClass, ds);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void createBlog(Blog blog) {
		try{
			save(blog);
		}catch(Exception e){
			throw new BlogException();
		}
	}

	@Override
	public List<Blog> getAllBlogs() {
		List<Blog> blogs = createQuery().order("-blogViews").asList();
		return blogs;
	}

	@Override
	public Blog getBlogById(String id) {
			Query<Blog> query = createQuery().field("blogId").equal(id);
			Blog result = query.get();
			if(result == null)
				throw new BlogNotFoundException();
			return result;
	}

	@Override
	public void updateBlog(Blog blog) {
		save(blog);
		
	}

	@Override
	public void deleteBlog(Blog blog) {
		delete(blog);
		
	}

	@Override
	public void deleteBlogById(String id) {
		Query<Blog> query = createQuery().field("blogId").equal(id);
		Blog blog = query.get();
		if(blog == null)
			throw new BlogNotFoundException();
		delete(blog);
		
	}

	@Override
	public List<Blog> searchBlog(String q) throws BlogException {
		
		try{
			Map<String, Blog> uniqueList = new HashMap<String, Blog>();
			List<Blog> searchResult_title = createQuery().field("blogTitle").contains(q).asList();
			List<Blog> searchResult_text = createQuery().field("blogText").contains(q).asList();
			
			for(Blog blog: searchResult_title)
				uniqueList.put(blog.getBlogId(), blog);
			
			for(Blog blog: searchResult_text)
				uniqueList.put(blog.getBlogId(), blog);

			List<Blog> searchResult = new ArrayList<Blog>(uniqueList.values());		
			return searchResult;
			
		}catch(Exception e){
			throw new BlogException();
		}
		
	}

	@Override
	public List<Blog> getAllBlogsPagination(int limit, int start) {
		List<Blog> blogs = createQuery().order("-blogViews").offset(start).limit(limit).asList();
		return blogs;
	
	}
	
}
