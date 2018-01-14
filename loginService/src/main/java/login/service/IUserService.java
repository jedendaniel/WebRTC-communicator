package login.service;

import login.model.User;
import org.springframework.security.access.annotation.Secured;

import java.util.List;

public interface IUserService {
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    List<User> getAllUsers();
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    boolean addUser(User user);
}
