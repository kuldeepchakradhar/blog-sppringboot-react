package com.example.demo.model;

import org.hibernate.validator.constraints.NotBlank;

public class PasswordResetTokenModel {

    @NotBlank
    private String passwordOne;

    @NotBlank
    private String token;

    public String getPasswordOne() {
        return passwordOne;
    }

    public void setPasswordOne(String passwordOne) {
        this.passwordOne = passwordOne;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
