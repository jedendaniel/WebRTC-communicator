package webrtcapi.service;

import webrtcapi.dao.IRelationDAO;
import webrtcapi.model.Relation;
import webrtcapi.model.RelationStatus;
import webrtcapi.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelationService implements IRelationService {
    @Autowired
    private IRelationDAO relationDAO;
    @Autowired
    private webrtcapi.dao.IUserDAO userDao;

    @Override
    public List<Relation> getAllUserRelations(String login) {
        return relationDAO.getAllUserRelations(userDao.getUser(new User(null, login, null, null, null)));
    }

    @Override
    public List<Relation> getUserRelationsByStatus(User user, RelationStatus relationStatus) {
        return relationDAO.getUserRelationsByStatus(user, relationStatus);
    }

    @Override
    public Relation getRelation(Relation relation) {
        return relationDAO.getRelation(relation);
    }

    @Override
    public Relation getRelation(String name1, String name2) {
        Relation relation = new Relation();
        User user1 = new User();
        user1.setName(name1);
        user1 = userDao.getUser(user1);
        User user2 = new User();
        user2.setName(name2);
        user2 = userDao.getUser(user2);
        if (user1 != null && user2 != null) {
            Relation relation1 = new Relation();
            relation.setUsr1Id(user1);
            relation.setUsr2Id(user2);
            return relationDAO.getRelation(relation);
        } else {
            return null;
        }
    }

    @Override
    public boolean addRelation(Relation relation) {
        User user1 = userDao.getUser(relation.getUsr1Id());
        relation.setUsr1Id(user1);
        relation.setUsr2Id(userDao.getUser(relation.getUsr2Id()));
        if (relation.getUsr1Id() != null && relation.getUsr2Id() != null) {
            if (relationDAO.getRelation(relation) == null) {
                relationDAO.addRelation(relation);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean updateRelation(Relation relation) {
        relation.setUsr1Id(userDao.getUser(relation.getUsr1Id()));
        relation.setUsr2Id(userDao.getUser(relation.getUsr2Id()));
        if (relation.getUsr1Id() != null && relation.getUsr2Id() != null) {
            relation.setId(relationDAO.getRelation(relation).getId());
            if (relation != null) {
                relationDAO.updateRelation(relation);
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean deleteRelation(Relation relation) {
        relation.setUsr1Id(userDao.getUser(relation.getUsr1Id()));
        relation.setUsr2Id(userDao.getUser(relation.getUsr2Id()));
        if (relation.getUsr1Id() != null && relation.getUsr2Id() != null) {
            relation = relationDAO.getRelation(relation);
            if (relation != null) {
                relationDAO.deleteRelation(relation);
                return true;
            }
        }
        return false;
    }
}