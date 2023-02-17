package com.vc.userAuthentication.security;

import com.vc.userAuthentication.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTSecurityTokenGeneratorImpl implements SecurityTokenGenerator {

    @Override
    public Map<String,String > createToken(User user) {
        String token = null;
        Map<String, Object> claims = new HashMap<>();
        claims.put("email",user.getEmail());
        claims.put("role",user.getRole());
//        System.out.println(user.getRole());
//        System.out.println(user.getEmail());
        System.out.println(claims);

        token = generateToken(claims,user.getEmail());
        Map<String, String> result = new HashMap<>();
        result.put("token",token);
        result.put("message","Successfully Logged In");
        result.put("role", user.getRole());
        result.put("email",user.getEmail());

        return result;
    }

    public String generateToken(Map<String,Object> claims, String subject){
        String jwtToken = Jwts.builder().setIssuer("PD-Auth")
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"pdkey")
                .compact();

        return jwtToken;

    }
}
