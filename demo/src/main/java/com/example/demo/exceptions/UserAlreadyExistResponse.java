package com.example.demo.exceptions;

public class UserAlreadyExistResponse {
    String username;

    public UserAlreadyExistResponse(String username){
        this.username =username;
    }

    public void setUsername(String username){
        this.username = username;
    }
    public String getUsername(){
        return username;
    }
}
