package com.learning.cmad.comments.biz;

import java.util.List;
import java.util.UUID;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;

import com.learning.cmad.comments.api.Comment;
import com.learning.cmad.comments.api.CommentException;
import com.learning.cmad.comments.api.CommentInterface;
import com.learning.cmad.comments.api.CommentNotFoundException;
import com.learning.cmad.comments.api.DuplicateCommentException;
import com.learning.cmad.comments.api.InvalidCommentException;
import com.learning.cmad.comments.data.CommentDAO;
import com.learning.cmad.comments.data.MorphiaCommentDAO;
import com.learning.cmad.utils.Databasehandler;

public class SimpleComment implements CommentInterface{

	Datastore datastore = Databasehandler.getMongoDatastore();
	private CommentDAO dao = new MorphiaCommentDAO(Comment.class,datastore);

	
	@Override
	public Comment createComment(Comment comment) throws InvalidCommentException, DuplicateCommentException, CommentException {
		comment.setCommentId(UUID.randomUUID().toString());
		Comment createdComment = dao.createComment(comment);
		return createdComment;
	}

	@Override
	public List<Comment> getAllComments() throws CommentException {
		return dao.getAllComments();
	}

	@Override
	public Comment getCommentById(String commentId) throws CommentNotFoundException, CommentException {
		return dao.getCommentById(commentId);
	}

	@Override
	public List<Comment> getCommentsByUserId(String userId) throws CommentNotFoundException, CommentException {
		return null;
	}

	@Override
	public List<Comment> getCommentsByBlogId(String blogId) throws CommentNotFoundException, CommentException {
		return dao.getCommentByBlog(blogId);
	}

	@Override
	public void updateComment(Comment comment) throws InvalidCommentException, DuplicateCommentException, CommentException {
		dao.updateComment(comment);
	}

	@Override
	public void deleteComment(Comment comment) throws InvalidCommentException, DuplicateCommentException, CommentException {
		dao.deleteComment(comment);
		
	}

	@Override
	public void deleteCommentById(String id) throws InvalidCommentException, DuplicateCommentException, CommentException {
		dao.deleteCommentById(id);
		
	}

}
