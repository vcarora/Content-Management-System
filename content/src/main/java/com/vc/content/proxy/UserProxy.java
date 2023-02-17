package com.vc.content.proxy;

import com.vc.content.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-authentication-service",url = "localhost:8081")
public interface UserProxy {
    @PostMapping("/authentication/register")
    public ResponseEntity<?> registerUser(@RequestBody User user);
}
