package login.model;

import javax.persistence.*;

@Entity
@Table(name = "relation")
public class Relation {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "usr1_id", nullable = false)
    private User usr1Id;

    @ManyToOne
    @JoinColumn(name = "usr2_id", nullable = false)
    private User usr2Id;

    @Column(name = "status1")
    private RelationStatus status1;

    @Column(name = "status2")
    private RelationStatus status2;

    public Relation() {
    }

    public Relation(User usr1Id, User usr2Id, RelationStatus status1, RelationStatus status2) {
        this.usr1Id = usr1Id;
        this.usr2Id = usr2Id;
        this.status1 = status1;
        this.status2 = status2;
    }

    public User getUsr1Id() {
        return usr1Id;
    }

    public void setUsr1Id(User usr1Id) {
        this.usr1Id = usr1Id;
    }

    public User getUsr2Id() {
        return usr2Id;
    }

    public void setUsr2Id(User usr2Id) {
        this.usr2Id = usr2Id;
    }

    public RelationStatus getStatus1() {
        return status1;
    }

    public void setStatus1(RelationStatus status1) {
        this.status1 = status1;
    }

    public RelationStatus getStatus2() {
        return status2;
    }

    public void setStatus2(RelationStatus status2) {
        this.status2 = status2;
    }
}
