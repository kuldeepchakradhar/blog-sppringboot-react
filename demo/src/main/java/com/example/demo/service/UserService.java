package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    User createUser(User user);

    Iterable<User> findAllUsers();

    User findUserById(Long user_id);

    User updateUser(User user, Long id);


    boolean requestPasswordReset(String username);

    boolean resetPassword(String passwordOne, String token);

    User getUsername(String name);

    void saveUserImage(User user);
}
