package com.concretepage.dao;
import com.concretepage.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
@Transactional
public class UserDAO implements IUserDAO {
    @PersistenceContext
    private EntityManager entityManager;
    public User getActiveUser(String userName) {
        User activeUser = new User();
        short enabled = 1;
        List<?> list = entityManager.createQuery("SELECT u FROM User u WHERE userName=? and enabled=?")
                .setParameter(1, userName).setParameter(2, enabled).getResultList();
        if(!list.isEmpty()) {
            activeUser = (User)list.get(0);
        }
        return activeUser;
    }

    @Override
    public User getUserById(String userName) {
        return entityManager.find(User.class, userName);
    }
    @SuppressWarnings("unchecked")
    @Override
    public List<User> getAllUsers() {
        String hql = "FROM User as usr ORDER BY usr.username";
        return (List<User>) entityManager.createQuery(hql).getResultList();
    }
    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }
    @Override
    public void updateUser(User user) {
        User usr = getUserById(user.getUserName());
        usr.setCountry(user.getCountry());
        usr.setFullName(user.getFullName());
        usr.setPassword(user.getPassword());
        entityManager.flush();
    }
    @Override
    public void deleteUser(String userName) {
        entityManager.remove(getUserById(userName));
    }
    @Override
    public boolean UserExists(String userName) {
        String hql = "FROM User as usr WHERE usr.username = ?";
        int count = entityManager.createQuery(hql).setParameter(1, userName).getResultList().size();
//        int count = entityManager.createQuery(hql).setParameter(1, title)
//                .setParameter(2, category).getResultList().size();
        return count > 0 ? true : false;
    }
}