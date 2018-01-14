package login.dao;

import login.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Transactional
@Repository
public class UserDAO implements IUserDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public List<User> getAllUsers() {
        String hql = "FROM User as usr ORDER BY usr.id";
        return (List<User>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public boolean userExists(String login) {
        String hql = "FROM User as usr WHERE usr.login = ?";
        int count = entityManager.createQuery(hql).setParameter(1,login).getResultList().size();
        return count > 0 ? true : false;
    }

    @Override
    public User getUserByLogin(String login) {
        User user = new User();
        String hql = "SELECT usr FROM User usr WHERE login = ?";
        List<?> list = entityManager.createQuery(hql).setParameter(1,login).getResultList();
        if(!list.isEmpty()){
            user = (User)list.get(0);
        }
        return user;
    }


}
