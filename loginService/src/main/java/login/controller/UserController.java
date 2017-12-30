package login.controller;

import login.dao.IUserDAO;

import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/user")
public class UserController {

    @Autowired
    IUserDAO userDao;

    String mainPath = "/user";

    @RequestMapping(value = "/getAll", produces="application/json")
    @ResponseBody
    public Iterable<User> getAllUsers(){
        return userDao.findAll();
    }

    @RequestMapping(value = "/byName")
    @ResponseBody
    public ResponseEntity<Boolean> getUser(@RequestBody String name){
        try{
            return new ResponseEntity<>(userDao.findByName(name),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST, produces="application/json", consumes = "application/json")
    @ResponseBody
    public User signIn(@RequestBody User postedUser){
        try{
            User user = userDao.signIn(postedUser.getLogin(),postedUser.getPassword());
            if(user != null){
                return user;
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public Boolean create(@RequestBody User postedUser) {
        //User newUser = new User(postedUser.getName(),postedUser.getLogin(),postedUser.getPassword());
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
                return true;
//                return new ResponseEntity<String>(message,HttpStatus.OK);
            }
        }
        catch (Exception ex) {
            return false;
//            return new ResponseEntity<String>(ex.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return !alreadyExists;
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