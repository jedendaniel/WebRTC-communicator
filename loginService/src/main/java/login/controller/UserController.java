package login.controller;

import login.dao.IUserDAO;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    IUserDAO userDAO;

    @RequestMapping("/testUser")
    public User user() {
        return new User("testLogin", "testPassword","testEmail");
    }

    @RequestMapping("/users")
    public Iterable<User> getAllUsers(){
        return userDAO.findAll();
    }
}