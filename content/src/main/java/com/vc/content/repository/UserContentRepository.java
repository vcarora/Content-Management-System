package com.vc.content.repository;

import com.vc.content.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserContentRepository extends MongoRepository<User,String> {

    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);


}
