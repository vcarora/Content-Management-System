package com.vc.userAuthentication.security;

import com.vc.userAuthentication.domain.User;

import java.util.Map;

public interface SecurityTokenGenerator {

    Map<String,String> createToken(User user);
}
