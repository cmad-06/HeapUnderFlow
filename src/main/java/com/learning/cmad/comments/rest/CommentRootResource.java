package com.learning.cmad.comments.rest;

import java.net.URISyntaxException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.learning.cmad.comments.api.Comment;
import com.learning.cmad.comments.api.CommentInterface;
import com.learning.cmad.comments.biz.SimpleComment;
import com.learning.cmad.user.api.User;


@Consumes(MediaType.APPLICATION_JSON)
@Produces({ MediaType.APPLICATION_JSON })


@Path("/comment")

public class CommentRootResource {
	
private CommentInterface commentObj = new SimpleComment();

	@POST
	@Path("/")
	@Produces("application/vnd.heapunderflow-v1+json")
	public Response addComment(Comment newComment) throws URISyntaxException {
		commentObj.createComment(newComment);
		return Response.ok().build();
	}
	
	@GET
    @Path("/")
	public Response getAllComments() {
		List<Comment> comments = commentObj.getAllComments();
		return Response.ok().entity(comments).build();
	}
	
	@GET
    @Path("/userId")
	public Response getAllCommentsByUserId(String userId) {
		List<Comment> comments = commentObj.getCommentsByUserId(userId);
		return Response.ok().entity(comments).build();
	}
	
	@GET
    @Path("/blogId")
	public Response getAllCommentsByBlogId(String blogId) {
		List<Comment> comments = commentObj.getCommentsByBlogId(blogId);
		return Response.ok().entity(comments).build();
	}
	
	@GET
    @Path("/{id}")
	public Response getCommentById(@PathParam("id") String commentId) {
		Comment comment = commentObj.getCommentById(commentId);
		return Response.ok().entity(comment).build();
	}
	
	@PUT
    @Path("/{id}")
	public Response updateComment(Comment updatedComment) {
		System.out.println("RECEIVER USER for update");
		System.out.println(updatedComment);
		commentObj.updateComment(updatedComment);
		return Response.ok().entity(updatedComment).build();
	}

}
