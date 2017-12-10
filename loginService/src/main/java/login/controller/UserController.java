package login.controller;

import login.dao.IUserDAO;
import login.dao.UserDAO;
import login.model.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    IUserDAO userDAO = new UserDAO();

    @RequestMapping("/testUser")
    public User user() {
        return new User("testLogin", "testPassword","testEmail");
    }

    @RequestMapping("/users")
    public List<User> getAllUsers(){
        return userDAO.getAllUsers();
    }
}