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
import com.learning.cmad.utils.JWTRequired;
import com.learning.cmad.utils.JWTTokenHelper;

@Consumes(MediaType.APPLICATION_JSON)
@Produces({ MediaType.APPLICATION_JSON })
@Path("/user")
public class UserRootResource {

	private BlogUser user = new SimpleBlogUser();
	
	@JWTRequired
	@GET
    @Path("/")
	public Response getAllUsers() {
		List<User> users = user.getAllUsers();
		return Response.ok().entity(users).build();
	}
	
	@JWTRequired
	@GET
    @Path("/{id}")
	public Response getUserById(@PathParam("id") String userId) {
		User currentUser = user.getUserById(userId);
		return Response.ok().entity(currentUser).build();
	}
	
	@JWTRequired
	@PUT
    @Path("/{id}")
	public Response updateUser(User updatedUser) {
		System.out.println("RECEIVER USER for update");
		System.out.println(updatedUser);
		user.updateUser(updatedUser);
		return Response.ok().entity(updatedUser).build();
	}
	
	@JWTRequired
	@DELETE
    @Path("/{id}")
	public Response deleteUser(@PathParam("id") String userId) {
		user.deleteUserById(userId);
		return Response.ok().build();
	}
	
	
	@POST
    @Path("/signup")
//	@Produces("application/vnd.heapunderflow-v1+json")
	public Response signupUser(User newUser) throws URISyntaxException {
		
		newUser.setPassword(EncryptorDecryptor.encryptData(newUser.getPassword())); 	//encrypt password before persisting
		System.out.println(newUser.getPassword());
		
		String userId = user.createUser(newUser);
		String token = JWTTokenHelper.createJWT(UUID.randomUUID().toString(), newUser.getUsername(), "sample subject", (7*86400000));	//setting expiry to 7 days
		
		System.out.println(newUser.getPassword());
		Map<String , String> data = new HashMap<String , String>();
		data.put("userId", userId);
		data.put("token", token);
		Gson gson = new Gson();
		String responseData = gson.toJson(data);
		return Response.ok(responseData).build();
		
	}
	
	@POST
    @Path("/signup")
	@Produces("application/vnd.heapunderflow-v2+json")
	public Response signupUserVersion2(User newUser, @Context UriInfo uriInfo) throws URISyntaxException {
		String username = newUser.getUsername();
		System.out.println(newUser.getFirstName());
		System.out.println(newUser.getLastName());
		newUser.setPassword(EncryptorDecryptor.encryptData(newUser.getPassword())); 	//encrypt password before persisting
		String userId = user.createUser(newUser);
		String token = JWTTokenHelper.createJWT(UUID.randomUUID().toString(), newUser.getUsername(), "sample subject", (7*86400000));	//setting expiry to 7 days
		UriBuilder builder = uriInfo.getBaseUriBuilder();
        builder.path(userId.toString());
        return Response.created(builder.build()).header("userId", userId).header("username", username).header("token", token).build();
        
	}
	
	@POST
    @Path("/login")
	public Response loginUser(String userDetail) {
		Gson gson = new Gson();
		Map<String, Object> map = gson.fromJson(userDetail, new TypeToken<Map<String, Object>>(){}.getType());
		try {
			User loginuser = user.loginUser(map);
			String token1 = JWTTokenHelper.createJWT(UUID.randomUUID().toString(), (String) map.get("username"), "sample subject", (7*86400000));	//setting expiry to 7 days

			Map<String , String> responseData = new HashMap<String , String>();
			responseData.put("userId", loginuser.getUserId().toString());
			responseData.put("token", token1);
			
			return Response.ok(responseData).build();
		
		} catch (Exception e) {
			throw new UserNotFoundException();
		}
		
	}
	
	@JWTRequired
	@POST
	@Path("/{id}/blog")
	public Response addBlogForUser(@PathParam("id") String userId, Blog blog){
		user.addBlogForUser(blog, userId);
		return Response.ok().build();

	}
	
	
	@JWTRequired
	@GET
	@Path("/{id}/blog")
	public Response getBlogsForUser(@PathParam("id") String userId){
		List<Blog> userBlogs = user.getBlogsForUser(userId);
		return Response.ok().entity(userBlogs).build();

	}
	
	@JWTRequired
	@DELETE
	@Path("/{id}/blog/{blogId}")
	public Response deleteUserBlogById(@PathParam("id") String userId, @PathParam("blogId") String blogId){
		 user.deleteUserBlogById(userId, blogId);
		return Response.ok().build();

	}
	
	
}
