package login.dao;

import login.model.User;
import org.springframework.data.repository.CrudRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.Serializable;
import java.util.List;

//public class UserDAO implements IUserDAO{
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Override
//    public List<User> getAllUsers() {
//        String query = "FROM users as usr ORDEDR BY usr.id";
//        return(List<User>) entityManager.createQuery(query).getResultList();
//    }
//
//    @Override
//    public User getUserById(int userId) {
//        return entityManager.find(User.class, userId);
//    }
//
//    @Override
//    public void addUser(User user) {
//        entityManager.persist(user);
//    }
//
//    @Override
//    public void updateUser(User user) {
//        User usr = getUserById((user.getId()));
//        usr.setLogin(user.getLogin());
//        usr.setPassword((user.getPassword()));
//        usr.setEmail(user.getEmail());
//        entityManager.flush();
//    }
//
//    @Override
//    public void deleteUser(User user) {
//        entityManager.remove(getUserById(user.getId()));
//    }
//
//    @Override
//    public boolean userExist(String login, String email) {
//        String query = "FROM users as usr WHERE usr.login = ? or usr.email = ?";
//        int pos = entityManager.createQuery(query)
//                .setParameter(1,login)
//                .setParameter(2,email)
//                .getFirstResult();
//        return pos != 0 ? true : false;
//    }
//}

public class UserDAO implements CrudRepository{

    @Override
    public Object save(Object o) {
        return null;
    }

    @Override
    public Iterable save(Iterable iterable) {
        return null;
    }

    @Override
    public Object findOne(Serializable serializable) {
        return null;
    }

    @Override
    public boolean exists(Serializable serializable) {
        return false;
    }

    @Override
    public Iterable findAll() {
        return null;
    }

    @Override
    public Iterable findAll(Iterable iterable) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void delete(Serializable serializable) {

    }

    @Override
    public void delete(Object o) {

    }

    @Override
    public void delete(Iterable iterable) {

    }

    @Override
    public void deleteAll() {

    }
}


