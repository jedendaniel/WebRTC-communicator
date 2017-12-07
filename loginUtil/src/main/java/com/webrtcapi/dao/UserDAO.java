package com.webrtcapi.dao;

import com.webrtcapi.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class UserDAO implements IUserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        String query = "FROM User as usr ORDEDR BY usr.Id";
        return(List<User>) entityManager.createQuery(query).getResultList();
    }

    @Override
    public User getUserById(int userId) {
        return entityManager.find(User.class, userId);
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUser(User user) {
        User usr = getUserById((user.getId()));
        usr.setLogin(user.getLogin());
        usr.setPassword((user.getPassword()));
        usr.setEmail(user.getEmail());
        entityManager.flush();
    }

    @Override
    public void deleteUser(User user) {
        entityManager.remove(getUserById(user.getId()));
    }

    @Override
    public boolean userExist(String login, String email) {
       String query = "FROM User as usr WHERE usr.login = ? or usr.email = ?";
       int pos = entityManager.createQuery(query)
               .setParameter(1,login)
               .setParameter(2,email)
               .getFirstResult();
       return pos != 0 ? true : false;
    }
}
