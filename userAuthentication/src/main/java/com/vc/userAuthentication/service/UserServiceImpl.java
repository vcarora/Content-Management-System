package com.vc.userAuthentication.service;

import com.vc.userAuthentication.domain.User;
import com.vc.userAuthentication.exception.UserAlreadyExistException;
import com.vc.userAuthentication.exception.UserNotFoundException;
import com.vc.userAuthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistException {
        if(userRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistException();
        }

        return userRepository.save(user);
    }

    @Override
    public User findByEmailAndPassword(String email, String password) throws UserNotFoundException {
        User loggedIn = userRepository.findByEmailAndPassword(email,password);
       /* if(loggedIn == null)
            throw new UserNotFoundException();*/
        return loggedIn;
    }

    public User loginCheck(User user){
        if(userRepository.findById(user.getEmail()).isPresent()){
            User user1 = userRepository.findById(user.getEmail()).get();
            if(user1.getPassword().equals(user.getPassword())){
                return user1;
            }else
                return null;
        }else
            return null;
    }
}
