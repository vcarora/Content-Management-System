package com.vc.content.controller;

import com.vc.content.domain.Content;
import com.vc.content.domain.User;
import com.vc.content.exception.UserAlreadyExistException;
import com.vc.content.exception.UserNotFoundException;
import com.vc.content.service.SequenceGeneratorService;
import com.vc.content.service.UserContentService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/userdetails")
//@CrossOrigin("*")
public class UserContentController {

    private UserContentService userProductService;
    private ResponseEntity<?> responseEntity;

    private SequenceGeneratorService sequenceGeneratorService;

    String email;

    @Autowired
    public UserContentController(UserContentService userProductService,SequenceGeneratorService sequenceGeneratorService) {
        this.userProductService = userProductService;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveDetails(@RequestBody User user) throws UserAlreadyExistException {
        try {
            return new ResponseEntity(userProductService.saveUser(user), HttpStatus.CREATED);
        }
        catch (UserAlreadyExistException e){
            throw new UserAlreadyExistException();
        }
    }
    @PostMapping("/user/addContent")
    public ResponseEntity<?> saveUserProductToList(@RequestBody Content content, HttpServletRequest request) throws UserNotFoundException {
        ResponseEntity responseEntity;
        try {
            System.out.println(request);
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            System.out.println(claims);
            content.setCid(sequenceGeneratorService.generateSequence(Content.SEQUENCE_NAME));
           responseEntity = new ResponseEntity(userProductService.saveUserProductToList(content, email), HttpStatus.OK);
       //   responseEntity = new ResponseEntity(userProductService.saveUserProductToList(content, "xxx@gmail.com"), HttpStatus.OK);
        }catch (UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    @GetMapping("/user/getContent")
    public ResponseEntity getAllDetails(){
        List<User> users = userProductService.getAllDetails();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

   /* @GetMapping("/user/getCont/{email}")
    public ResponseEntity<?> getUserDetail(@PathVariable  String email) throws UserNotFoundException{
       User users = userProductService.findByEmail(email);
       List<Content> list = users.getContentList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }*/

    @GetMapping("/user/getCont")
    public ResponseEntity<?> getUserDetail(HttpServletRequest request) throws UserNotFoundException {
        try{
            Claims claims = (Claims) request.getAttribute("claims");
            email = claims.getSubject();
            System.out.println("user email from claims :: " + claims.getSubject());
            System.out.println("email " + email);
            System.out.println("email in user/movies " + email);
            User users = userProductService.findByEmail(email);
            List<Content> list = users.getContentList();
            responseEntity = new ResponseEntity<>(list, HttpStatus.OK);
        }catch(UserNotFoundException e)
        {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }

    @DeleteMapping("user/delete/{title}")
    public ResponseEntity<?> delete(@PathVariable String title ) throws UserNotFoundException{

        try {
            responseEntity = new ResponseEntity<>(userProductService.deleteContentFromList(email, title), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }
    @DeleteMapping("user/deletead/{title}/{email1}")
    public ResponseEntity<?> deleteAd(@PathVariable String title, @PathVariable String email1  ) throws UserNotFoundException{

        try {
            responseEntity = new ResponseEntity<>(userProductService.deleteContentFromList(email1, title), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        }
        return responseEntity;
    }
    @PutMapping("/user/update/{cid}")
    public ResponseEntity<?> updateContentfromList(@PathVariable long cid,@RequestBody Content content)throws UserNotFoundException{
        try {
            responseEntity = new ResponseEntity<>(userProductService.updateContent(email, cid,content), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new UserNotFoundException();
        }
        return responseEntity;


    }

}
