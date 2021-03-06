package webrtcapi.controller;

import webrtcapi.model.User;
import webrtcapi.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private IUserService userService;

    @CrossOrigin
    @RequestMapping(value = "users", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> list = userService.getAllUsers();
        return new ResponseEntity<List<User>>(list, HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "user", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<User> getUser(@RequestParam(value = "name", required = false) String name,
                                        @RequestParam(value = "login", required = false) String login) {
        User user = new User();
        user.setName(name);
        user.setLogin(login);
        user = userService.getUser(user);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @RequestMapping(value = "users", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Void> addUser(@RequestBody User postedUser) {
        boolean flag = userService.addUser(postedUser);
        if (flag == false) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "users", method = RequestMethod.PATCH, consumes = "application/json")
    public ResponseEntity<String> updateUser(@RequestBody User[] user) {
        StringBuilder message = new StringBuilder();
        int i = 0;
        if (user[1].getName() != null)
            if (userService.getUser(new User(user[1].getName(), null, null, null, null)) == null) {
                i++;
            } else {
                message.append("Name is already in use.\n");
            }
        else i++;
        if (user[1].getLogin() != null)
            if (userService.getUser(new User(null, user[1].getLogin(), null, null, null)) == null) {
                i++;
            } else {
                message.append("Login is already in use.\n");
            }
        else i++;
        if (i == 2) {
            message.append("Account has been updated :)\n");
            userService.updateUser(user[0], user[1]);
            return new ResponseEntity<String>(message.toString(), HttpStatus.OK);
        }
        return new ResponseEntity<String>(message.toString(), HttpStatus.CONFLICT);
    }

    @CrossOrigin
    @RequestMapping(value = "users", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity<Void> deleteUser(@RequestBody User postedUser) {
        boolean flag = userService.deleteUser(postedUser);
        if (flag == false) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}