package webrtcapi.dao;

import webrtcapi.model.Relation;
import webrtcapi.model.RelationStatus;
import webrtcapi.model.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RelationDAO implements IRelationDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Relation> getAllUserRelations(User user) {
        String hql = "FROM Relation as rel where (rel.usr1Id = ? or rel.usr2Id = ?)";
        return (List<Relation>) entityManager.createQuery(hql)
                .setParameter(1, user)
                .setParameter(2, user).getResultList();
    }

    @Override
    public List<Relation> getUserRelationsByStatus(User user, RelationStatus relationStatus) {
        String hql = "FROM Relation as rel where (rel.usr1Id = ? and rel.status1 = ?) or (rel.usr2Id = ? and rel.status2 = ?)";
        return (List<Relation>) entityManager.createQuery(hql)
                .setParameter(1, user)
                .setParameter(2, relationStatus)
                .setParameter(3, user)
                .setParameter(4, relationStatus).getResultList();
    }

    @Override
    public Relation getRelation(Relation relation) {
        Relation rel = new Relation();
        String hql = "FROM Relation as rel WHERE (rel.usr1Id = ? and rel.usr2Id = ?) or (rel.usr1Id = ? and rel.usr2Id = ?)";
        List<?> list = entityManager.createQuery(hql)
                .setParameter(1, relation.getUsr1Id())
                .setParameter(2, relation.getUsr2Id())
                .setParameter(3, relation.getUsr2Id())
                .setParameter(4, relation.getUsr1Id()).getResultList();
        if (!list.isEmpty()) {
            rel = (Relation) list.get(0);
            return rel;
        }
        return null;
    }

    @Transactional
    @Override
    public void addRelation(Relation relation) {
        entityManager.persist(relation);
    }

    @Transactional
    @Override
    public void updateRelation(Relation relation) {
        entityManager.merge(relation);
    }

    @Transactional
    @Override
    public void deleteRelation(Relation relation) {
        entityManager.remove(relation);
    }
}
