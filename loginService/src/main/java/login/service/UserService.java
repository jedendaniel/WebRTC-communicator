package login.service;

import login.dao.IUserDAO;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
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
    public synchronized boolean addUser(User user) {
        if(userDAO.userExists(user.getLogin())){
            return false;
        }
        else{
            userDAO.addUser(user);
            return true;
        }
    }
}
