package com.vc.content.service;

import com.vc.content.domain.Content;
import com.vc.content.domain.User;
import com.vc.content.exception.UserAlreadyExistException;
import com.vc.content.exception.UserNotFoundException;

import java.util.List;

public interface UserContentService {
    User saveUser(User user) throws UserAlreadyExistException;
    List<User> getAllDetails() ;
    User deleteContentFromList(String email,String title) throws UserNotFoundException;

    User findByEmailAndPassword(String email, String password);

    User saveUserProductToList(Content product, String email) throws UserNotFoundException;

    User findByEmail(String email) throws UserNotFoundException;
    User updateContent(String email, long cid, Content content) throws UserNotFoundException;
}
