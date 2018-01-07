package login.auth;

import java.util.ArrayList;
import java.util.List;

import login.dao.IUserDAO;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService{
    private final IUserDAO userDAO;

    @Autowired
    public CustomUserDetailsService(IUserDAO userDAO) {
        this.userDAO = userDAO;
    }


    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user=userDAO.findByLogin(login);
        if(null == user){
            throw new UsernameNotFoundException("No user present with username: " + login);
        }else{
            List<String> userRoles = new ArrayList<>();
            userRoles.add("USER_ROLE");
            return new CustomUserDetails(user,userRoles);
        }
    }

}