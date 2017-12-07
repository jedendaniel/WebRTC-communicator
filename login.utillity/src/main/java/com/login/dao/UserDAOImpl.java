package com.login.dao;

import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

import org.hibernate.Session;

import com.login.model.User;

public class UserDAOImpl implements UserDAO{

	private SessionFactory sessionFactory;
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	public void save(User u) {
		Session session = this.sessionFactory.openSession();
		Transaction tx = session.beginTransaction();
		session.persist(u);
		tx.commit();
		session.close();
	}
	
	@SuppressWarnings("unchecked")
	public List<User> list() {
		Session session = this.sessionFactory.openSession();
		List<User> userList = session.createQuery("from User").list();
		session.close();
		return userList;
	}
}
