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
import org.springframework.data.repository.CrudRepository;

/**
 * A DAO for the entity User is simply created by extending the CrudRepository
 * interface provided by spring. The following methods are some of the ones
 * available from such interface: save, delete, deleteAll, findOne and findAll.
 * The magic is that such methods must not be implemented, and moreover it is
 * possible create new query methods working only by defining their signature!
 *
 * @author netgloo
 */
@Transactional
public interface IUserDAO extends CrudRepository<User, Long> {

    /**
     * Return the user having the passed email or null if no user is found.
     *
     * @param email the user email.
     */
    public User findByEmail(String email);

}
