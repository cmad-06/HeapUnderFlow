package com.learning.cmad.comments.biz;

import java.util.List;

import com.learning.cmad.comments.api.Comment;
import com.learning.cmad.comments.api.CommentException;
import com.learning.cmad.comments.api.CommentInterface;
import com.learning.cmad.comments.api.CommentNotFoundException;
import com.learning.cmad.comments.api.DuplicateCommentException;
import com.learning.cmad.comments.api.InvalidCommentException;

public class SimpleComment implements CommentInterface{

	@Override
	public Comment createComment(Comment comment)
			throws InvalidCommentException, DuplicateCommentException, CommentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> getAllComments() throws CommentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Comment getCommentById(String commentId) throws CommentNotFoundException, CommentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> getCommentsByUserId(String userId) throws CommentNotFoundException, CommentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> getCommentsByBlogId(String blogId) throws CommentNotFoundException, CommentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateComment(Comment comment)
			throws InvalidCommentException, DuplicateCommentException, CommentException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteComment(Comment comment)
			throws InvalidCommentException, DuplicateCommentException, CommentException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteCommentById(String id)
			throws InvalidCommentException, DuplicateCommentException, CommentException {
		// TODO Auto-generated method stub
		
	}

}
