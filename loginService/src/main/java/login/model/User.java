package login.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="login")
    private String login;

    @Column(name="password")
    private String password;

    @Column(name="role")
    private String role;

    @Column(name="availability")
    private Boolean availability;

    public User() {
    }

    public User(String name, String login, String password, String role, Boolean availability) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.role = role;
        this.availability = availability;
    }

    public User(User user){
        this.name = user.getName();
        this.login = user.getLogin();
        this.password = user.getPassword();
        this.role = user.getRole();
        this.availability = user.getAvailability();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean available) {
        this.availability = available;
    }

}
