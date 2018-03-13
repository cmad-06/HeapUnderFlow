package com.learning.cmad.user.rest;
import java.net.URISyntaxException;
import java.util.HashMap;
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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.learning.cmad.blog.api.Blog;
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
		String token = "Version 1"+jwtTokenHelper.createJWT("1", newUser.getUsername(), "sample subject", 15000);
		return Response.ok(token).build();
	}
	
	@POST
    @Path("/signup")
	@Produces("application/vnd.heapunderflow-v2+json")
	public Response signupUserVersion2(User newUser, @Context UriInfo uriInfo) throws URISyntaxException {
		String username = newUser.getUsername();
		newUser.setPassword(EncryptorDecryptor.encryptData(newUser.getPassword())); 	//encrypt password before persisting
		int userId = user.createUser(newUser);
		String token = jwtTokenHelper.createJWT(UUID.randomUUID().toString(), newUser.getUsername(), "sample subject", 15000);
		UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(Integer.toString(userId));
        return Response.created(builder.build()).header("userId", userId).header("username", username).header("token", token).build();
        
	}
	
	@POST
    @Path("/login")
	public Response loginUser(String userDetail, @HeaderParam("token") String token) {
		Gson gson = new Gson();
		Map<String, Object> map = gson.fromJson(userDetail, new TypeToken<Map<String, Object>>(){}.getType());
		try {
			User loginuser = user.loginUser(map);
			String token1 = jwtTokenHelper.createJWT(UUID.randomUUID().toString(), (String) map.get("username"), "sample subject", 15000);

			Map<String , String> responseData = new HashMap<String , String>();
			responseData.put("userId", Integer.toString(loginuser.getUserId()));
			responseData.put("token", token1);
			
			return Response.ok(responseData).build();
		
		} catch (Exception e) {
			throw new UserNotFoundException();
		}
		
	}
	
	
	@POST
	@Path("/{id}/blog")
	public Response addBlogForUser(@PathParam("id") int userId, Blog blog){
		user.addBlogForUser(blog, userId);
		return Response.ok().build();

	}
	
	
	@GET
	@Path("/{id}/blog")
	public Response getBlogsForUser(@PathParam("id") int userId){
		List<Blog> userBlogs = user.getBlogsForUser(userId);
		return Response.ok().entity(userBlogs).build();

	}
	
	
}
