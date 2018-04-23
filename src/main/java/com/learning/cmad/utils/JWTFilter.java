package com.learning.cmad.utils;

import java.io.IOException;
import java.util.List;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

@JWTRequired
@Provider
@Priority(Priorities.AUTHENTICATION)
public class JWTFilter implements ContainerRequestFilter{

	private static final String JWT_HEADER = "authorization";
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

		System.out.println("Inside JWT filter");
		System.out.println(requestContext.getHeaders());
		List<String> jwtHeader = requestContext.getHeaders().get(JWT_HEADER);
		System.out.println(jwtHeader);
		if(jwtHeader != null && jwtHeader.size() > 0) {
			
			try{
				String token = jwtHeader.get(0);
				System.out.println(token);
				JWTTokenHelper.parseJWT(token);
				return;
			}catch(Exception e){
				Response unauthorizedStatus = Response.status(Response.Status.UNAUTHORIZED).entity("Unauthorized access or session expired!").build();
				requestContext.abortWith(unauthorizedStatus);
			}
		}
		
		Response unauthorizedStatus = Response.status(Response.Status.UNAUTHORIZED).entity("Unauthorized access or session expired!").build();
		requestContext.abortWith(unauthorizedStatus);
		
	}

}
