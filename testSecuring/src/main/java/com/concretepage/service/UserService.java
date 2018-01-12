package com.concretepage.service;

import com.concretepage.dao.IUserDAO;
import com.concretepage.entity.User;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserService implements IUserService {
    @Autowired
    private IUserDAO UserDAO;
    @Override
    public User getUserById(String username) {
        User obj = UserDAO.getUserById(username);
        return obj;
    }
    @Override
    public List<User> getAllUsers(){
        return UserDAO.getAllUsers();
    }
    @Override
    public synchronized boolean addUser(User User){
        if (UserDAO.UserExists(User.getUserName())) {
            return false;
        } else {
            UserDAO.addUser(User);
            return true;
        }
    }
    @Override
    public void updateUser(User User) {
        UserDAO.updateUser(User);
    }
    @Override
    public void deleteUser(String userName) {
        UserDAO.deleteUser(userName);
    }
}
