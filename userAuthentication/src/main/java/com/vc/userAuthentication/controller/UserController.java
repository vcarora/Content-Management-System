package com.vc.userAuthentication.controller;

import com.vc.userAuthentication.domain.User;
import com.vc.userAuthentication.exception.UserAlreadyExistException;
import com.vc.userAuthentication.exception.UserNotFoundException;
import com.vc.userAuthentication.security.SecurityTokenGenerator;
import com.vc.userAuthentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/authentication")
//@CrossOrigin("*")
public class UserController {

    private UserService userService;

    private SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    public UserController(UserService userService, SecurityTokenGenerator securityTokenGenerator) {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistException{
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) throws UserNotFoundException{

      User user1 =  userService.findByEmailAndPassword(user.getEmail(),user.getPassword());
        Map<String,String> token = securityTokenGenerator.createToken(user1);
        return new ResponseEntity<>(token,HttpStatus.OK);
    }
}
