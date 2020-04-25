package com.example.demo.exceptions;

public class PostAlreadyExistResponse {

    String postNotFound;

    public PostAlreadyExistResponse(String postNotFound){
        this.postNotFound = postNotFound;
    }

    public String getPostNotFound() {
        return postNotFound;
    }

    public void setPostNotFound(String postNotFound) {
        this.postNotFound = postNotFound;
    }

}
