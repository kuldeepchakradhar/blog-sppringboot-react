package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomReponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> hanldUsernameAlreadyExist(UserAlreadyExistException ex, WebRequest reg){
        UserAlreadyExistResponse existResponse = new UserAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity<Object>(existResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handlePostAleadyExist(PostAlreadyExistException ex, WebRequest reg){
        PostAlreadyExistResponse existResponse = new PostAlreadyExistResponse((ex.getMessage()));
        return new ResponseEntity<Object>(existResponse, HttpStatus.BAD_REQUEST);
    }
}
