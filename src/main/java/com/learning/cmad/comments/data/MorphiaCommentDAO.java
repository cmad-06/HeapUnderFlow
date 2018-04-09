package com.learning.cmad.comments.data;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.Query;

import com.learning.cmad.comments.api.Comment;

public class MorphiaCommentDAO extends BasicDAO<Comment, String> implements CommentDAO {

//-----------------------------------------------------------------------------------------------------------

	public MorphiaCommentDAO(Class entityClass, Datastore ds) {
		super(entityClass, ds);	
	}
	
//-----------------------------------------------------------------------------------------------------------

	@Override
	public String createComment(Comment comment) {
		save(comment);
		return comment.getCommentId();
		
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
		return query.get();
	}

//-----------------------------------------------------------------------------------------------------------
	
	@Override
	public void updateComment(Comment comment) {
		save(comment);
	}

//-----------------------------------------------------------------------------------------------------------
	
	@Override
	public void deleteComment(Comment comment) {
		delete(comment);
	}
	
//-----------------------------------------------------------------------------------------------------------

	@Override
	public void deleteCommentById(String id) {
		Query<Comment> query = createQuery().field("commentId").equal(id);
		Comment comment = query.get();
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
		// TODO Auto-generated method stub
		return null;
	}

//-----------------------------------------------------------------------------------------------------------

}
