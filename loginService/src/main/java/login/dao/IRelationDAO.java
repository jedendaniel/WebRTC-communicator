package login.dao;

import login.model.Relation;
import login.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IRelationDAO extends JpaRepository<Relation,Long> {

    @Query("SELECT r FROM Relation r WHERE r.usr1Id = ?1 or r.usr2Id = ?1")
    public Iterable<Relation> findByUser(User user);

    @Query("SELECT r FROM Relation r WHERE (r.usr1Id = ?1 and r.usr2Id = ?2) or (r.usr2Id = ?1 and r.usr1Id = ?2")
    public Relation findByUsers(User user1, User user2);
}
