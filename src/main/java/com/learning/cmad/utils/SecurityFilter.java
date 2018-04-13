package com.learning.cmad.utils;

import java.io.IOException;
import java.util.List;
import java.util.StringTokenizer;

import javax.annotation.Priority;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.glassfish.jersey.internal.util.Base64;
import org.mongodb.morphia.Datastore;

import com.learning.cmad.user.api.User;
import com.learning.cmad.user.data.MorphiaUserDAO;
import com.learning.cmad.user.data.UserDAO;

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class SecurityFilter implements ContainerRequestFilter{

	
	Datastore datastore = Databasehandler.getMongoDatastore();
	private MorphiaUserDAO userDAO = new MorphiaUserDAO(User.class,datastore);
	
	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String AUTHORIZATION_HEADER_PREFIX = "Basic ";
	private static final String SECURED_URL_PREFIX = "auth";
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {

			List<String> authHeader = requestContext.getHeaders().get(AUTHORIZATION_HEADER);
			if(authHeader != null && authHeader.size() > 0) {
				String authToken = authHeader.get(0);
				authToken = authToken.replaceFirst(AUTHORIZATION_HEADER_PREFIX, "");
				String decodedString = Base64.decodeAsString(authToken);
				StringTokenizer tokenizer = new StringTokenizer(decodedString, ":");
				String username = tokenizer.nextToken();
				String password = tokenizer.nextToken();

				boolean isValidUser = userDAO.isValidUser(username, password);
				if(isValidUser){
					return;	//successful credentials match
				}
			}
		
			Response unauthorizedStatus = Response.status(Response.Status.UNAUTHORIZED).entity("Unauthorized access!").build();
			requestContext.abortWith(unauthorizedStatus);
		
		}


}

