package login.service;

import login.dao.IRelationDAO;
import login.dao.IUserDAO;
import login.model.Relation;
import login.model.RelationStatus;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//TODO: handle these events like - addRelation means check if isn't exists and next save it via dao.

@Service
public class RelationService implements IRelationService {
    @Autowired
    private IRelationDAO relationDAO;

    @Override
    public List<Relation> getAllUserRelations(User user) {
        return relationDAO.getAllUserRelations(user);
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
    public boolean addRelation(Relation relation) {
        return false;
    }

    @Override
    public boolean updateRelation(Relation relation) {
        return false;
    }

    @Override
    public boolean deleteRelation(Relation relation) {
        return false;
    }
}