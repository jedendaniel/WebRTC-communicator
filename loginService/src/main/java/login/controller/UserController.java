package login.controller;

import login.dao.IUserDAO;
import login.model.User;
import login.model.UserPrivateData;
import login.model.UserPublicData;
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

    @RequestMapping(value = "/users", produces="application/json")
    @ResponseBody
    public Iterable<User> getAllUsers(){
        return userDao.findAll();
    }

//    @RequestMapping(value = "/user/{login}")
//    @ResponseBody
//    public ResponseEntity<Boolean> getUser(@RequestBody String login){
//        try{
//            return new ResponseEntity<>();
//        }
//    }

    //TODO: throw some exception if login or email is used, do it in some service or I don't know
    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> create(@RequestBody User postedUser) {
        //User user = null;
        try {
            UserPublicData userPublicData = new UserPublicData();
            userPublicData.setLogin(postedUser.getUserPublicData().getLogin());
            UserPrivateData userPrivateDataData = new UserPrivateData();
            userPrivateDataData.setPassword(postedUser.getUserPrivateData().getPassword());
            userPrivateDataData.setEmail(postedUser.getUserPrivateData().getEmail());
            //user = new User(user.getLogin(), user.getPassword(), user.getEmail());
            userDao.save(new User(userPrivateDataData,userPublicData));
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
            userDao.delete(id);
        }
        catch (Exception ex) {
            return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}