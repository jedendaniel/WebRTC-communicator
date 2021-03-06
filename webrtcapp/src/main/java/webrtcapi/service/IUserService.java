package webrtcapi.service;

import webrtcapi.model.User;
import org.springframework.security.access.annotation.Secured;

import java.util.List;

public interface IUserService {
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    List<User> getAllUsers();

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    User getUser(User user);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    boolean addUser(User user);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    boolean updateUser(User user, User postedUser);

    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    boolean deleteUser(User user);
}
