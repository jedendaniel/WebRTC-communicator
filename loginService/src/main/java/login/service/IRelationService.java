package login.service;

import login.model.Relation;
import login.model.RelationStatus;
import login.model.User;
import org.springframework.security.access.annotation.Secured;

import java.util.List;

public interface IRelationService {

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public List<Relation> getAllUserRelations(User user);
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public List<Relation> getUserRelationsByStatus(User user, RelationStatus relationStatus);
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public Relation getRelation(Relation relation);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public boolean addRelation(Relation relation);
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public boolean updateRelation(Relation relation);
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public boolean deleteRelation(Relation relation);
}