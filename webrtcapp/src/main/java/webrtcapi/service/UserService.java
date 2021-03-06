package webrtcapi.service;

import webrtcapi.dao.IUserDAO;
import webrtcapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserDAO userDAO;

    @Override
    public List<User> getAllUsers() {
        return userDAO.getAllUsers();
    }

    @Override
    public User getUser(User user) {
        return userDAO.getUser(user);
    }

    @Override
    public synchronized boolean addUser(User user) {
        if (userDAO.userExists(user)) {
            return false;
        } else {
            user.setPassword(crypt(user.getPassword()));
            userDAO.addUser(user);
            return true;
        }
    }

    @Override
    public boolean updateUser(User user, User postedUser) {
        user = userDAO.getUser(user);
        if (user != null) {
            if (postedUser.getLogin() != null) user.setLogin(postedUser.getLogin());
            if (postedUser.getName() != null) user.setName(postedUser.getName());
            if (postedUser.getPassword() != null) user.setPassword(crypt(postedUser.getPassword()));
            if (postedUser.getAvailability() != null) user.setAvailability(postedUser.getAvailability());
            userDAO.updateUser(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean deleteUser(User user) {
        user = userDAO.getUser(user);
        if (user != null) {
            userDAO.deleteUser(user);
            return true;
        } else {
            return false;
        }
    }

    private String crypt(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
}
