package login.controller;

import login.dao.IUserDAO;

import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/api")
public class UserController {

    @Autowired
    IUserDAO userDao;

    @RequestMapping(value = "/users",method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public Iterable<User> getAll(){
        return userDao.findAll();
    }

//    @RequestMapping(value = "/users/{name}")
//    @ResponseBody
//    public ResponseEntity<Boolean> getByName(@PathVariable("name") String name){
//        try{
//            return new ResponseEntity<>(userDao.findByName(name),HttpStatus.OK);
//        }
//        catch(Exception e){
//            return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @RequestMapping(value = "/users/{login}", method = RequestMethod.GET, produces="application/json")
    @ResponseBody
    public ResponseEntity<User> byLogin(@RequestParam("login") String login){
        try{
            User user = userDao.findByLogin(login);
            if(user != null){
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<User> create(@RequestBody User postedUser) {
        //User newUser = new User(postedUser.getName(),postedUser.getLogin(),postedUser.getPassword());
        boolean alreadyExists = false;
        try {
            if(userDao.findByName(postedUser.getName())){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            if(userDao.validateLogin(postedUser.getLogin())){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
            if(!alreadyExists){
                userDao.save(postedUser);
                return new ResponseEntity<>(postedUser, HttpStatus.OK);
            }
        }
        catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    @RequestMapping(value ="/users", method = RequestMethod.DELETE,consumes = "application/json")
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