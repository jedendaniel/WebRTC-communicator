package login.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    private static final long serialVersionUID = 1L;

    @Id
    //@Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

   // @Column(name = "login")
    private String login;

   // @Column(name = "password")
    private String password;

   // @Column(name = "email")
    private String email;

    public User() {
    }

    public User(long id) {
        this.id = id;
    }

    public User(String login, String password, String email) {
        this.login = login;
        this.password = password;
        this.email = email;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
