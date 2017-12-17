package login.controller;

import login.dao.IUserDAO;

import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    IUserDAO userDao;

    @RequestMapping(value = "/users", produces="application/json")
    @ResponseBody
    public Iterable<User> getAllUsers(){
        return userDao.findAll();
    }

    @RequestMapping(value = "/user")
    @ResponseBody
    public ResponseEntity<Boolean> getUser(@RequestBody String name){
        try{
            return new ResponseEntity<>(userDao.findByName(name),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> create(@RequestBody User postedUser) {
        boolean alreadyExists = false;
        String message = "";
        try {
            if(userDao.findByName(postedUser.getName())){
                message += "Name is already in use\n";
                alreadyExists = true;
            }
            if(userDao.findByLogin(postedUser.getLogin())){
                message += "Login is already in use\n";
                alreadyExists = true;
            }
            if(!alreadyExists){
                message = "User created successfully!";
                userDao.save(postedUser);
                return new ResponseEntity<String>(message,HttpStatus.OK);
            }
        }
        catch (Exception ex) {
            return new ResponseEntity<String>(ex.toString(),HttpStatus.CONFLICT);
        }
        return new ResponseEntity<String>(message,HttpStatus.CONFLICT);
    }

    @RequestMapping(value ="/delete", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Boolean> delete(@RequestBody long id) {
        try {
            userDao.delete(id);
        }
        catch (Exception ex) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}