package com.learning.cmad.comments.data;

import java.util.List;

import com.learning.cmad.comments.api.Comment;

public interface CommentDAO {
	
	//Create
		public String createComment(Comment comment);
		
		//Read
		public List<Comment> getAllComments();
		public Comment getCommentById(String id);
		public List<Comment> getCommentByUser(String UserId);
		public List<Comment> getCommentByBlog(String BlogId);
		
		//Update
		public void updateComment(Comment comment);
		
		
		//Delete
		public void deleteComment(Comment comment);
		public void deleteCommentById(String id);

}
