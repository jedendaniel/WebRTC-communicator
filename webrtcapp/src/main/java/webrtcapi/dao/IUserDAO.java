package webrtcapi.dao;

import webrtcapi.model.User;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface IUserDAO {

    List<User> getAllUsers();

    User getUser(User user);

    boolean userExists(User user);

    void addUser(User user);

    void updateUser(User user);

    void deleteUser(User user);
}
