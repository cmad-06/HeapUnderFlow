package com.learning.cmad.blog.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.blog.api.BlogInterface;
import com.learning.cmad.blog.biz.SimpleBlog;

@Consumes(MediaType.APPLICATION_JSON)
@Produces({ MediaType.APPLICATION_JSON })


@Path("/blog")
public class BlogRootResource {

	private BlogInterface blogObj = new SimpleBlog();

	
	@GET
    @Path("/")
	public Response getAllBlogs() {
		List<Blog> blogs = blogObj.getAllBlogs();
		return Response.ok().entity(blogs).build();
	}
	
}
