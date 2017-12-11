package login.controller;

import login.dao.IUserDAO;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    IUserDAO userDao;

    @RequestMapping("/testUser")
    public User user() {
        return new User("testLogin", "testPassword","testEmail");
    }

    @RequestMapping(value = "/users", produces="application/json")
    @ResponseBody
    public Iterable<User> getAllUsers(){
        return userDao.findAll();
    }

    //TODO: throw some exception if login or email is used, do it in some service or I don't know
    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> create(@RequestBody String login, String password, String email) {
        User user = null;
        try {
            user = new User(login, password, email);
            userDao.save(user);
        }
        catch (Exception ex) {
            return new ResponseEntity<String>(ex.toString(),HttpStatus.CONFLICT);
        }
        return new ResponseEntity<String>("Dodano",HttpStatus.OK);
    }

    @RequestMapping(value ="/delete", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Boolean> delete(long id) {
        try {
            User user = new User(id);
            userDao.delete(user);
        }
        catch (Exception ex) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}