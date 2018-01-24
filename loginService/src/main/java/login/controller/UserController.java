package login.controller;

import login.dao.IUserDAO;

import login.model.User;
import login.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//TODO: add some

@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private IUserService userService;

    @RequestMapping(value = "users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> list = userService.getAllUsers();
        return new ResponseEntity<List<User>>(list,HttpStatus.OK);
    }

    @RequestMapping(value = "users", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Void> addUser(@RequestBody User postedUser){
        boolean flag = userService.addUser(postedUser);
        if(flag == false){
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}