package com.learning.cmad.blog.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.learning.cmad.blog.api.BlogException;
import com.learning.cmad.blog.api.BlogNotFoundException;
import com.learning.cmad.blog.api.DuplicateBlogException;
import com.learning.cmad.blog.api.InvalidBlogException;

@Provider
public class BlogExceptionHandler implements ExceptionMapper<BlogException> {

	@Override
	public Response toResponse(BlogException e) {
		if (e instanceof BlogNotFoundException) {
			return Response.status(401).build();
		}
		if (e instanceof DuplicateBlogException) {
			return Response.status(409).build();
		}
		if (e instanceof InvalidBlogException) {
			return Response.status(404).build();
		}
		return Response.status(500).build();
	}

}
