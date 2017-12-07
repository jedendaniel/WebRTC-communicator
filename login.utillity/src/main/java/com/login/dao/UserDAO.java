package com.login.dao;

import java.util.List;

import com.login.model.User;

public interface UserDAO {

	public void save(User u);
	
	public List<User> list();
}
