package webrtcapi.service;

import webrtcapi.model.Relation;
import webrtcapi.model.RelationStatus;
import webrtcapi.model.User;
import org.springframework.security.access.annotation.Secured;

import java.util.List;

public interface IRelationService {

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public List<Relation> getAllUserRelations(String login);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public List<Relation> getUserRelationsByStatus(User user, RelationStatus relationStatus);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public Relation getRelation(Relation relation);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public Relation getRelation(String name1, String name2);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public boolean addRelation(Relation relation);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public boolean updateRelation(Relation relation);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    public boolean deleteRelation(Relation relation);
}