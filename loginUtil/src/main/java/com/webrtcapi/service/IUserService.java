package com.webrtcapi.service;

import com.webrtcapi.model.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User getUserById(int userId);
    boolean addUser(User user);
    void updateUser(User user);
    void deleteUser(int userId);
}
