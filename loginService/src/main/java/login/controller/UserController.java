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

    @RequestMapping(value = "user", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<User> getUser(@RequestParam(value="name", required = false) String name, @RequestParam(value="login", required = false) String login){
        User user = new User();
        user.setName(name);
        user.setLogin(login);
        user = userService.getUser(user);
        if(user != null){
            return new ResponseEntity<User>(user,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "users", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Void> addUser(@RequestBody User postedUser){
        boolean flag = userService.addUser(postedUser);
        if(flag == false){
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "users", method = RequestMethod.PATCH, consumes = "application/json")
    public ResponseEntity<Void> updateUser(@RequestBody User[] user){
        boolean flag = userService.updateUser(user[0], user[1]);
        if(flag == false){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(value = "users", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity<Void> deleteUser(@RequestBody User postedUser){
        boolean flag = userService.deleteUser(postedUser);
        if(flag == false){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}