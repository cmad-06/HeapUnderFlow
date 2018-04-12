package com.learning.cmad.comments.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.learning.cmad.comments.api.CommentException;
import com.learning.cmad.comments.api.CommentNotFoundException;
import com.learning.cmad.comments.api.DuplicateCommentException;
import com.learning.cmad.comments.api.InvalidCommentException;

@Provider
public class CommentExceptionHandler implements ExceptionMapper<CommentException>{

	@Override
	public Response toResponse(CommentException e) {
		if (e instanceof CommentNotFoundException) {
			return Response.status(401).build();
		}
		if (e instanceof DuplicateCommentException) {
			return Response.status(409).build();
		}
		if (e instanceof InvalidCommentException) {
			return Response.status(404).build();
		}
		return Response.status(500).build();
	}


}
