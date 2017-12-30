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

    @RequestMapping(value = "/users/{name}")
    @ResponseBody
    public ResponseEntity<Boolean> getByName(@PathVariable("name") String name){
        try{
            return new ResponseEntity<>(userDao.findByName(name),HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(false,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @RequestMapping(value = "/users", method = RequestMethod.POST, produces="application/json", consumes = "application/json")
//    @ResponseBody
//    public ResponseEntity<User> ByLoginAndPassword(@RequestBody User postedUser){
//        try{
//            User user = userDao.signIn(postedUser.getLogin(),postedUser.getPassword());
//            if(user != null){
//                return new ResponseEntity<>(user, HttpStatus.OK);
//            }
//            else{
//                return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
//            }
//        }
//        catch(Exception e){
//            return null;
//        }
//    }

    @RequestMapping(value = "/users/{login}{password}", method = RequestMethod.GET, produces="application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<User> ByLoginAndPassword(@PathVariable("login") String login, @PathVariable("password") String password){
        try{
            User user = userDao.signIn(login,password);
            if(user != null){
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
            }
        }
        catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<User> create(@RequestBody User postedUser) {
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
                return new ResponseEntity<>(postedUser, HttpStatus.OK);
            }
        }
        catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);

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