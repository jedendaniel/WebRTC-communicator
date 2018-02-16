package webrtcapi.controller;

import webrtcapi.dao.IUserDAO;
import webrtcapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("public")
public class UtilController {
    @Autowired
    private IUserDAO userDAO;

    @CrossOrigin
    @RequestMapping(value = "newAccount", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> newAccount(@RequestBody User user) {
        StringBuilder message = new StringBuilder();
        int i = 0;
        if (userDAO.userExists(new User(user.getName(), null, null, null, null)))
            message.append("Name is not available. Try different...\n");
        else i++;
        if (userDAO.userExists(new User(null, user.getLogin(), null, null, null)))
            message.append("Login is not available. Try different...\n");
        else i++;
        if (i == 2) {
            try {
                user.setPassword(crypt(user.getPassword()));
                userDAO.addUser(user);
            } catch (Exception e) {
                message.append("Different error.");
                return new ResponseEntity<String>(message.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<String>(message.toString(), HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(message.toString(), HttpStatus.CONFLICT);
        }
    }

    private String crypt(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
}
