package com.vc.content.service;

import com.vc.content.domain.Content;
import com.vc.content.domain.User;
import com.vc.content.exception.UserAlreadyExistException;
import com.vc.content.exception.UserNotFoundException;
import com.vc.content.proxy.UserProxy;
import com.vc.content.repository.UserContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserContentServiceImpl implements UserContentService {
    private UserContentRepository userProductRepository;

    private UserProxy userProxy;

    @Autowired
    public UserContentServiceImpl(UserContentRepository userProductRepository, UserProxy userProxy) {
        this.userProductRepository = userProductRepository;
        this.userProxy = userProxy;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistException {
        if(userProductRepository.findById(user.getEmail()).isPresent()){
            throw new UserAlreadyExistException();
        }
        User savedUser = userProductRepository.save(user);
        if(!(savedUser.getEmail().isEmpty())){
            ResponseEntity r = userProxy.registerUser(user);
            System.out.println(r.getBody());
        }

        return savedUser;
    }

    @Override
    public List<User> getAllDetails() {
        return userProductRepository.findAll();
    }

    @Override
    public User deleteContentFromList(String email, String title) throws UserNotFoundException {

        if(userProductRepository.findById(email).isEmpty()){
            throw new UserNotFoundException();
        }
        User user = userProductRepository.findById(email).get();
        List<Content> contentList = user.getContentList();

        contentList.removeIf(x->x.getTitle().equals(title) );
        user.setContentList(contentList);
        return userProductRepository.save(user);

    }

    @Override
    public User findByEmailAndPassword(String email, String password) {
        return  userProductRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public User saveUserProductToList(Content content, String email) throws UserNotFoundException {
        if(userProductRepository.findById(email).isEmpty()){
            throw new UserNotFoundException();
        }
        User user = userProductRepository.findByEmail(email);
        if(user.getContentList()==null){
            user.setContentList(Arrays.asList(content));
        }else {
            List<Content> contents = user.getContentList();
            contents.add(content);
            user.setContentList(contents);
        }
        return userProductRepository.save(user);
    }

    @Override
    public User findByEmail(String email) throws UserNotFoundException {
        if (userProductRepository.findById(email).isEmpty()) {
            throw new UserNotFoundException();
        }

        return userProductRepository.findByEmail(email);
    }

    @Override
    public User updateContent(String email, long cid, Content content) throws UserNotFoundException{
        if(userProductRepository.findById(email).isEmpty()){
            throw new UserNotFoundException();
        }
        User user = userProductRepository.findById(email).get();
        List<Content> contentList = user.getContentList();
        for (Content c:contentList) {
            if(c.getCid() == cid) {
                c.setTitle(content.getTitle());
                c.setDescription(content.getDescription());
            }
        }
        user.setContentList(contentList);
        return userProductRepository.save(user);

    }
}
