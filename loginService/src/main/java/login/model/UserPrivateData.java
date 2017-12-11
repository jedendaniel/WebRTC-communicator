package login.model;

import javax.persistence.*;

@Entity
@Table(name = "user_private_data")
public class UserPrivateData {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    public UserPrivateData() {
    }

    public UserPrivateData(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public long getId() {
        return id;
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
