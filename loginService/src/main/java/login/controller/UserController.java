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

//    @RequestMapping(value = "/user/{login}")
//    @ResponseBody
//    public ResponseEntity<Boolean> getUser(@RequestBody String login){
//        try{
//            return new ResponseEntity<>(true, HttpStatus.FOUND);
//        }
//        catch (Exception e){
//            return  new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
//        }
//    }

    //TODO: throw some exception if login or email is used, do it in some service or I don't know
    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> create(@RequestBody User postedUser) {
        try {
            userDao.save(postedUser);
        }
        catch (Exception ex) {
            return new ResponseEntity<String>(ex.toString(),HttpStatus.CONFLICT);
        }
        return new ResponseEntity<String>("Dodano",HttpStatus.OK);
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