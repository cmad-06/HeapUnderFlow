package com.learning.cmad.user.rest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.learning.cmad.user.api.BlogUser;
import com.learning.cmad.user.api.User;
import com.learning.cmad.user.api.UserNotFoundException;
import com.learning.cmad.user.biz.SimpleBlogUser;
import com.learning.cmad.utils.EncryptorDecryptor;
import com.learning.cmad.utils.JWTTokenHelper;

@Consumes(MediaType.APPLICATION_JSON)
@Produces({ MediaType.APPLICATION_JSON })
@Path("/user")
public class UserRootResource {

	private BlogUser user = new SimpleBlogUser();
	private JWTTokenHelper jwtTokenHelper = new JWTTokenHelper();
	
	@GET
    @Path("/")
	public Response getAllUsers() {
		List<User> users = user.getAllUsers();
		return Response.ok().entity(users).build();
	}
	
	@GET
    @Path("/{id}")
	public Response getUserById(@PathParam("id") int userId) {
		User currentUser = user.getUserById(userId);
		return Response.ok().entity(currentUser).build();
	}
	
	@PUT
    @Path("/{id}")
	public Response updateUser(User updatedUser) {
		user.updateUser(updatedUser);
		return Response.ok().entity(updatedUser).build();
	}
	
	@DELETE
    @Path("/{id}")
	public Response deleteUser(@PathParam("id") int userId) {
		user.deleteUserById(userId);
		return Response.ok().build();
	}
	
	
	@POST
    @Path("/signup")
	@Produces("application/vnd.heapunderflow-v1+json")
	public Response signupUser(User newUser) throws URISyntaxException {
		
		user.createUser(newUser);
		String token = "Version 2"+jwtTokenHelper.createJWT("1", newUser.getUsername(), "sample subject", 15000);
		return Response.ok(token).build();
	}
	
	
	@POST
    @Path("/signup")
	@Produces("application/vnd.heapunderflow-v2+json")
	public Response signupUserVersion2(User newUser) throws URISyntaxException {
		newUser.setPassword(EncryptorDecryptor.encryptData(newUser.getPassword())); 	//encrypt password before persisting
		user.createUser(newUser);
		String token = jwtTokenHelper.createJWT(UUID.randomUUID().toString(), newUser.getUsername(), "sample subject", 15000);
		return Response.ok(token).build();
	}
	
	@POST
    @Path("/login")
	public Response loginUser(String loginUser, @HeaderParam("token") String token) {
		Gson gson = new Gson();
		Map<String, Object> map = gson.fromJson(loginUser, new TypeToken<Map<String, Object>>(){}.getType());
		try {
			User currentUser = user.getUserByUsername((String) map.get("username"));
			String sentPassword = EncryptorDecryptor.encryptData((String) map.get("password"));
			if (sentPassword.equals(currentUser.getPassword())) {
					String token1 = jwtTokenHelper.createJWT(UUID.randomUUID().toString(), currentUser.getUsername(), "sample subject", 15000);
					return Response.ok(token1).build();
			}
			else {
				throw new UserNotFoundException();
			}
		
		} catch (Exception e) {
			throw new UserNotFoundException();
		}
	
		
	}
	
}
