package login.model;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class User {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "private_data_id")
//    @OneToOne(fetch = FetchType.LAZY)
//    @PrimaryKeyJoinColumn
    private UserPrivateData userPrivateData;

    @OneToOne
    @JoinColumn(name = "public_data_id")
//    @OneToOne(fetch = FetchType.LAZY)
//    @PrimaryKeyJoinColumn
    private UserPublicData userPublicData;

    public User() {
        this.userPrivateData = new UserPrivateData();
        this.userPublicData = new UserPublicData();
    }

    public User(UserPrivateData userPrivateData, UserPublicData userPublicData) {
        this.userPrivateData = userPrivateData;
        this.userPublicData = userPublicData;
    }

    public long getId() {
        return id;
    }

    public UserPrivateData getUserPrivateData() {
        return userPrivateData;
    }

    public void setUserPrivateData(UserPrivateData userPrivateData) {
        this.userPrivateData = userPrivateData;
    }

    public UserPublicData getUserPublicData() {
        return userPublicData;
    }

    public void setUserPublicData(UserPublicData userPublicData) {
        this.userPublicData = userPublicData;
    }
}
