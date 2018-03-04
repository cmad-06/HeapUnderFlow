package com.learning.cmad.blog.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.learning.cmad.blog.api.Blog;

@Consumes(MediaType.APPLICATION_JSON)
@Produces({ MediaType.APPLICATION_JSON })


@Path("/blog")
public class BlogRootResource {

	@GET
    @Path("/")
	public Response getAllBlogs() {
		List<Blog> blogs = new ArrayList<>(); 
		Blog blog = new Blog();
		blog.setBlogTitle("Blog title");
		blog.setBlogAuthor("VJ");
		blogs.add(blog);
		return Response.ok().entity(blogs).build();
	}
	
}
