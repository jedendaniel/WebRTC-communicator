package login.dao;

import login.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    public boolean userExists(User user) {
        String hql = "FROM User as usr WHERE (usr.login = ? or usr.name = ?)";
        int count = entityManager.createQuery(hql)
                .setParameter(1,user.getLogin())
                .setParameter(2,user.getName()).getResultList().size();
        return count > 0 ? true : false;
    }

    @Override
    public User getUser(User user) {
        String hql = "SELECT usr FROM User usr WHERE (login = ? or name = ?)";
        List<?> list = entityManager.createQuery(hql)
                .setParameter(1,user.getLogin())
                .setParameter(2,user.getName()).getResultList();
        if(!list.isEmpty()){
            user = (User)list.get(0);
        }
        return user;
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public void deleteUser(User user) {
        entityManager.remove(user);
    }
}
