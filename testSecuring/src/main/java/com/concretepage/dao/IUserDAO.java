package com.concretepage.dao;
import com.concretepage.entity.User;

import java.util.List;

public interface IUserDAO {
    User getActiveUser(String userName);
    List<User> getAllUsers();
    User getUserById(String username);
    void addUser(User user);
    void updateUser(User user);
    void deleteUser(String username);
    boolean UserExists(String userName);
}

