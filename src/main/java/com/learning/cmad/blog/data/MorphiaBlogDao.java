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

public class MorphiaBlogDao extends BasicDAO<Blog, String> implements BlogDAO{
	
	public MorphiaBlogDao(Class entityClass, Datastore ds) {
		super(entityClass, ds);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void createBlog(Blog blog) {
		save(blog);
	}

	@Override
	public List<Blog> getAllBlogs() {
		List<Blog> blogs = createQuery().asList();
		return blogs;
	}

	@Override
	public Blog getBlogById(String id) {
		Query<Blog> query = createQuery().field("blogId").equal(id);
		return query.get();
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
	
}
