package com.learning.cmad.comments.data;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Key;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import com.learning.cmad.comments.api.Comment;
import com.learning.cmad.comments.api.CommentException;
import com.learning.cmad.comments.api.CommentNotFoundException;
import com.mongodb.WriteResult;

public class MorphiaCommentDAO extends BasicDAO<Comment, String> implements CommentDAO {

//-----------------------------------------------------------------------------------------------------------

	public MorphiaCommentDAO(Class entityClass, Datastore ds) {
		super(entityClass, ds);	
	}
	
//-----------------------------------------------------------------------------------------------------------

	@Override
	public Comment createComment(Comment comment) {
		Key<Comment> key = save(comment);
		if(key == null)
			throw new CommentException();
		return comment;
		
	}

//-----------------------------------------------------------------------------------------------------------

	@Override
	public List<Comment> getAllComments() {
		List<Comment> comments = createQuery().asList();
		return comments;
	}

//-----------------------------------------------------------------------------------------------------------

	@Override
	public Comment getCommentById(String id) {
		Query<Comment> query = createQuery().field("commentId").equal(id);
		Comment comment = query.get();
		if(comment == null)
			throw new CommentNotFoundException();
		
		return comment;
	}

//-----------------------------------------------------------------------------------------------------------
	
	@Override
	public void updateComment(Comment comment) {
		Key<Comment> key = save(comment);
		if(key == null)
			throw new CommentNotFoundException();
	}

//-----------------------------------------------------------------------------------------------------------
	
	@Override
	public void deleteComment(Comment comment) {
		WriteResult result = delete(comment);
		if(result == null)
			throw new CommentNotFoundException();
	}
	
//-----------------------------------------------------------------------------------------------------------

	@Override
	public void deleteCommentById(String id) {
		Query<Comment> query = createQuery().field("commentId").equal(id);
		Comment comment = query.get();
		
		if(comment == null)
			throw new CommentNotFoundException();
		
		delete(comment);
		
	}

//-----------------------------------------------------------------------------------------------------------
	
	@Override
	public List<Comment> getCommentByUser(String UserId) {
		// TODO Auto-generated method stub
		return null;
	}

//-----------------------------------------------------------------------------------------------------------
	
	@Override
	public List<Comment> getCommentByBlog(String BlogId) {
		Query<Comment> query = createQuery().field("blogId").equal(BlogId);
		return (List<Comment>) query.get();
	}

//-----------------------------------------------------------------------------------------------------------

}
