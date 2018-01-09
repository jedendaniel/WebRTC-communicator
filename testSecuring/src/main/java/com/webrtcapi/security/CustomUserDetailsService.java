package com.webrtcapi.security;

import com.webrtcapi.domain.User;
import com.webrtcapi.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService{
    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByUserName(username);
        if(null == user){
            throw new UsernameNotFoundException("No user present with username: "+username);
        }else{
//            List<String> userRoles=userRolesRepository.findRoleByUserName(username);
            List<String> userRoles = new ArrayList<String>();
            userRoles.add("USER_ROLE");
            return new CustomUserDetails(user,userRoles);
        }
    }

}
