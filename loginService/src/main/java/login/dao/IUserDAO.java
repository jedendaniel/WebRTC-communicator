package login.dao;

import login.model.User;

import java.util.List;

public interface IUserDAO {

    List<User> getAllUsers();
    User getUserById(int userId);
    void addUser(User user);
    void updateUser(User user);
    void deleteUser(User user);
    boolean userExist(String login, String email);
}

