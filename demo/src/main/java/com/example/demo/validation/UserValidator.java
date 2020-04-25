package com.example.demo.validation;


import com.example.demo.model.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        // TODO Auto-generated method stub
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        // TODO Auto-generated method stub

        User user = (User) target;

        if(user.getPassword() == null){
            errors.rejectValue("password","Message", "Password field is required");
        }

        if(user.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password mush be at least 6 characters");
        }

        if(!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
    }

}