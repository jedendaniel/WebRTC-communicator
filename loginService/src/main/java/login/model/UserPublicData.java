package login.model;

import javax.persistence.*;

@Entity
@Table(name = "user_public_data")
public class UserPublicData {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "login")
    private String login;

    public UserPublicData() {
    }

    public UserPublicData(String login) {
        this.login = login;
    }

    public long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
