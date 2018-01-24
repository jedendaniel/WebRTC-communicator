package login.dao;

import login.model.Relation;
import login.model.RelationStatus;
import login.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
