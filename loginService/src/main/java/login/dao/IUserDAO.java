package login.dao;

import login.model.User;

import java.util.List;

//public interface IUserDAO {
//
//    List<User> getAllUsers();
//    User getUserById(int userId);
//    void addUser(User user);
//    void updateUser(User user);
//    void deleteUser(User user);
//    boolean userExist(String login, String email);
//}

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@Transactional
public interface IUserDAO extends JpaRepository<User, Long> {

    @Query("SELECT case when (count(u) > 0)  then true else false end FROM User u WHERE u.name = ?1")
    public boolean findByName(String name);

    @Query("SELECT case when (count(u) > 0)  then true else false end FROM User u WHERE u.login = ?1")
    public boolean validateLogin(String login);

    @Query("SELECT u FROM User u WHERE u.login = ?1 AND u.password = ?2")
    public User signIn(String login, String password);

    @Query("SELECT u FROM User u WHERE u.login = ?1 AND u.password = ?2")
    public User findByLogin(String login);
}
