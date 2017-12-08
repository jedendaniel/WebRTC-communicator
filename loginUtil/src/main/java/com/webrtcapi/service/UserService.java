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
        return userDAO.getAllUsers();
    }

    @Override
    public User getUserById(int userId) {
        User obj = userDAO.getUserById(userId);
        return obj;
    }

    @Override
    public boolean addUser(User user) {
        if(userDAO.userExist(user.getLogin(), user.getEmail()))
            return false;
        else{
            userDAO.addUser(user);
            return true;
        }
    }

    @Override
    public void updateUser(User user) {
    }

    @Override
    public void deleteUser(int userId) {

    }
}
