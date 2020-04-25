package com.example.demo.service.impl;

import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.model.PasswordResetToken;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.PasswordResetTokenRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.utils.MailService;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private MailService mailService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);
        if(user == null){
            throw new UsernameNotFoundException("username is not exist "+user.getUsername());
        }

        return user;
    }

    @Override
    public User createUser(User user) {
        try {
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findById(1l).get());

            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setUsername(user.getUsername());
            user.setConfirmPassword("");
            user.setRoles(roles);

            return userRepository.save(user);

        }catch (Exception e){
            throw new UserAlreadyExistException("username already exist "+user.getUsername());
        }
    }

    @Override
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Long user_id) {

        User user = userRepository.findUserById(user_id);

        if(user == null){
            throw new UserAlreadyExistException("User is not found with id "+user_id);
        }
        return user;
    }

    @Override
    public User updateUser(User user, Long id) {

            User user1 = findUserById(id);

            user1.setFullname(user.getFullname());
            user1.setRoles(user.getRoles());
            return userRepository.save(user1);
    }

    @Override
    public boolean requestPasswordReset(String username) {

        boolean returnValue = false;

        User user = userRepository.findByUsername(username);
        if(user == null){
            return returnValue;
        }

        String token = new Utils().generatePasswordResetToken(user.getId());
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setUser(user);
        passwordResetToken.setToken(token);
        passwordResetTokenRepository.save(passwordResetToken);

        returnValue = mailService.sendPasswordResetToken(user.getFullname(), user.getUsername(), token);

        return returnValue;
    }

    @Override
    public boolean resetPassword(String passwordOne, String token) {

        boolean returnValue = false;

        if(Utils.hasTokenExpired(token)){
            return false;
        }

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(token);
        if(passwordResetToken == null){
            return false;
        }

        String encodePassword = bCryptPasswordEncoder.encode(passwordOne);

        User user = passwordResetToken.getUser();
        user.setPassword(encodePassword);

        User saveUser = userRepository.save(user);

        if(saveUser != null && saveUser.getPassword().equalsIgnoreCase(encodePassword)){
            returnValue = true;
        }

        passwordResetTokenRepository.delete(passwordResetToken);

        return returnValue;

   }

    @Override
    public User getUsername(String name) {
        return userRepository.findByUsername(name);
    }

    @Override
    public void saveUserImage(User user) {
        userRepository.save(user);
    }


}
