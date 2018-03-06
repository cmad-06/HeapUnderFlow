package com.learning.cmad.user.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import com.learning.cmad.user.api.DuplicateUserException;
import com.learning.cmad.user.api.InvalidUserException;
import com.learning.cmad.user.api.UserException;
import com.learning.cmad.user.api.UserNotFoundException;

@Provider
public class UserExceptionHandler implements ExceptionMapper<UserException> {

	@Override
	public Response toResponse(UserException e) {
		if (e instanceof UserNotFoundException) {
			return Response.status(401).build();
		}
		if (e instanceof DuplicateUserException) {
			return Response.status(409).build();
		}
		if (e instanceof InvalidUserException) {
			return Response.status(404).build();
		}
		return Response.status(500).build();
	}

}
