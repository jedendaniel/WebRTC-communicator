package login.controller;

import login.model.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @RequestMapping("/testUser")
    public User user() {
        return new User("testLogin", "testPassword");
    }
}