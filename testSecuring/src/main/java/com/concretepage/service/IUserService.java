package com.concretepage.service;

import com.concretepage.entity.User;
import org.springframework.security.access.annotation.Secured;

import java.util.List;

public interface IUserService {
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    List<User> getAllUsers();
    @Secured ({"ROLE_ADMIN", "ROLE_USER"})
    User getUserById(String username);
    @Secured ({"ROLE_ADMIN"})
    boolean addUser(User user);
    @Secured ({"ROLE_ADMIN"})
    void updateUser(User user);
    @Secured ({"ROLE_ADMIN"})
    void deleteUser(String userName);
}
