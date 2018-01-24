package login.dao;

import login.model.Relation;
import login.model.RelationStatus;
import login.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

//TODO: do the stuff !add, update, delete means only what it means, not any check or whatever!
//TODO: test queries (fields names and syntax)

@Repository
public class RelationDAO implements IRelationDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Relation> getAllUserRelations(User user) {
        String hql = "FROM Relation as rel where (rel.usr1_id = user or rel.usr2_id = user)";
        return ( List<Relation>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public List<Relation> getUserRelationsByStatus(User user, RelationStatus relationStatus) {
        String hql = "FROM Relation as rel where ((rel.usr1_id = user or rel.usr2_id = user) and rel.status = relationStatus)";
        return ( List<Relation>) entityManager.createQuery(hql).getResultList();
    }

    @Override
    public Relation getRelation(Relation relation) {
        Relation rel = new Relation();
        String hql = "SELECT rel FROM Relation rel WHERE usr1_id = ? and usr2_id = ?";
        List<?> list = entityManager.createQuery(hql).setParameter(1,relation.getUsr1Id()).setParameter(2,relation.getUsr2Id()).getResultList();
        if(!list.isEmpty()){
            rel = (Relation)list.get(0);
        }
        return rel;
    }

    @Override
    public void addRelation(Relation relation) {

    }

    @Override
    public void updateRelation(Relation relation) {

    }

    @Override
    public void deleteRelation(Relation relation) {

    }
}
