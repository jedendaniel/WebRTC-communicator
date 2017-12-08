package com.webrtcapi.service;

import com.webrtcapi.dao.IUserDAO;
import com.webrtcapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserService implements IUserService {
    @Autowired
    private IUserDAO userDAO;

    @Override
    public List<User> getAllUsers() {
    }

    @Override
    public User getUserById(int userId) {
        User obj = userDAO.getUserById(userId);
    }

    @Override
    public boolean addUser(User user) {
        return false;
    }

    @Override
    public void updateUser(User user) {

    }

    @Override
    public void deleteUser(int userId) {

    }
}
