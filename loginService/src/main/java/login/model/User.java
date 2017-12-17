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

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
//    private ArrayList<Relation> relations = new ArrayList<>();

    public User() {
    }

    public User(String name, String login, String password) {
        this.name = name;
        this.login = login;
        this.password = password;
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
//
//    public ArrayList<Relation> getRelations() {
//        return relations;
//    }
}
