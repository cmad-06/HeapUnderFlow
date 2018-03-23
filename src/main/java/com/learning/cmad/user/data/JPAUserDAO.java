package com.learning.cmad.user.data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.learning.cmad.blog.api.Blog;
import com.learning.cmad.user.api.User;

public class JPAUserDAO implements UserDAO {

	private EntityManagerFactory emf = Persistence.createEntityManagerFactory("blog_db");
	private EntityManager em = emf.createEntityManager();
	
	@Override
	public String createUser(User user) {
		em.getTransaction().begin();
		em.persist(user);
		em.flush();
		em.getTransaction().commit();
		em.close();
		return user.getUserId();
	}

	@Override
	public List<User> getAllUsers() {

		Query query = em.createQuery("from User");
		List<User> users = query.getResultList();
		return users;

	}

	@Override
	public User getUserById(String id) {
		Query query = em.createQuery("from User where userId = :id").setParameter("id", id);
		User user = (User) query.getSingleResult();
		return user;
	}

	@Override
	public void deleteUser(User user) {
		deleteUserById(user.getUserId());

	}

	@Override
	public void updateUser(User user) {

		em.getTransaction().begin();
		em.merge(user);
		em.getTransaction().commit();
		em.close();
	}

	@Override
	public void deleteUserById(String id) {
		
		em.getTransaction().begin();
		em.remove(em.find(User.class, id));
		em.getTransaction().commit();
		em.close();
	}

	@Override
	public User getUserByKey(String key, String value) {
		Query query = em.createQuery("from User where username = :" + key).setParameter(key, value);
		User user = (User) query.getSingleResult();
		return user;
		
	}

	
	@Override
	public List<String> getBlogsForUser(String userId) {
		
		em.getTransaction().begin();
		Query query = em.createQuery("from User where userId = :id").setParameter("id", userId);
		User user = (User) query.getSingleResult();
		em.getTransaction().commit();
		em.close();
		return user.getUserBlogs();
	}

}
