package com.vc.userAuthentication.service;

import com.vc.userAuthentication.domain.User;
import com.vc.userAuthentication.exception.UserAlreadyExistException;
import com.vc.userAuthentication.exception.UserNotFoundException;

public interface UserService {

    User registerUser(User user) throws UserAlreadyExistException;
    User findByEmailAndPassword(String email, String password) throws UserNotFoundException;
    User loginCheck(User user);
}
