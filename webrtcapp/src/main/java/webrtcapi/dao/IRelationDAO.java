package webrtcapi.dao;

import webrtcapi.model.Relation;
import webrtcapi.model.RelationStatus;
import webrtcapi.model.User;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface IRelationDAO {

    public List<Relation> getAllUserRelations(User user);

    public List<Relation> getUserRelationsByStatus(User user, RelationStatus relationStatus);

    public Relation getRelation(Relation relation);

    public void addRelation(Relation relation);

    public void updateRelation(Relation relation);

    public void deleteRelation(Relation relation);
}
