package com.example.demo.controller;

import com.example.demo.model.PasswordResetTokenModel;
import com.example.demo.model.User;
import com.example.demo.payload.JWTSuccessLoginResponse;
import com.example.demo.payload.PasswordResetTokenResponse;
import com.example.demo.payload.UserLoginRequest;
import com.example.demo.security.JWTTokenProvider;
import com.example.demo.security.SecurityConstrains;
import com.example.demo.service.MapValidationErrorService;
import com.example.demo.service.UserService;
import com.example.demo.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/create")
    public ResponseEntity<?> addUser(@Valid @RequestBody User user, BindingResult result) {

        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if(errorMap != null) return errorMap;

        User user1 = userService.createUser(user);

        return new ResponseEntity<User>(user1, HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginRequest(@Valid @RequestBody UserLoginRequest loginRequest, BindingResult result){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = SecurityConstrains.TOKEN_PRIFIX + jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTSuccessLoginResponse(true,token));

    }
    // will user this later
//
//    @GetMapping("/all")
//    public Iterable<User> findAllUsers(){
//        return userService.findAllUsers();
//    }

    @GetMapping("/{user_id}")
    public ResponseEntity<?> findById(@PathVariable Long user_id){

        User user = userService.findUserById(user_id);

        return new ResponseEntity<User>(user,HttpStatus.OK);
    }

    @PatchMapping("/{user_id}")
    public ResponseEntity<?> updateUserDetails(@RequestBody User user, @PathVariable Long user_id){
        User user1 = userService.updateUser(user, user_id);

        return new ResponseEntity<String>("User Details updated", HttpStatus.OK);
    }


    @PostMapping("/password-reset-token")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordResetTokenResponse passwordResetTokenResponse){

        boolean returnValue = userService.requestPasswordReset(passwordResetTokenResponse.getUsername());

        PasswordResetTokenResponse prtr = new PasswordResetTokenResponse();
        prtr.setResponse("Password reset link sent to your account");
        if(!returnValue){
            prtr.setResponse(("This email address in not exist"));
            prtr.setUsername(passwordResetTokenResponse.getUsername());
            return new ResponseEntity<PasswordResetTokenResponse>(prtr, HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<PasswordResetTokenResponse>(prtr, HttpStatus.OK);
    }

    @PostMapping("/pass-reset-token")
    public ResponseEntity<?> passwordResetToken(@RequestBody PasswordResetTokenModel passwordReset){

        boolean returnValue = userService.resetPassword(passwordReset.getPasswordOne(), passwordReset.getToken());

        String res = "Your password is change successfully";
        if(!returnValue){
            res = "Token link has been expired please forget password again";
        }
        return new ResponseEntity<String>(res, HttpStatus.OK);
    }

}
