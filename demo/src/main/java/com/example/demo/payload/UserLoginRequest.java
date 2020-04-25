package com.example.demo.payload;

import org.hibernate.validator.constraints.NotBlank;

public class UserLoginRequest {

    @NotBlank(message = "Username can not be null")
    private String username;

    @NotBlank(message = "Password can not be null")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
