package com.concretepage.controller;

import com.concretepage.entity.User;
import com.concretepage.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Controller
@RequestMapping("/api")
public class UserController {
    @Autowired
    private IUserService UserService;
    @GetMapping("User/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String userName) {
        User User = UserService.getUserById(userName);
        return new ResponseEntity<User>(User, HttpStatus.OK);
    }
    @GetMapping("Users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> list = UserService.getAllUsers();
        return new ResponseEntity<List<User>>(list, HttpStatus.OK);
    }
    @PostMapping("User")
    public ResponseEntity<Void> addUser(@RequestBody User User, UriComponentsBuilder builder) {
        boolean flag = UserService.addUser(User);
        if (flag == false) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/User/{id}").buildAndExpand(User.getUserName()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }
    @PutMapping("User")
    public ResponseEntity<User> updateUser(@RequestBody User User) {
        UserService.updateUser(User);
        return new ResponseEntity<User>(User, HttpStatus.OK);
    }
    @DeleteMapping("User/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String userName) {
        UserService.deleteUser(userName);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
