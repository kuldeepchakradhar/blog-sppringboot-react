package com.example.demo.security;

import com.example.demo.model.User;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTTokenProvider {

    public String generateToken(Authentication authentication){
        // loading the principle of requested user
        User user = (User)authentication.getPrincipal();

        //current data
        Date now = new Date(System.currentTimeMillis());

        // expiration date
        Date expirationTime = new Date(now.getTime()+SecurityConstrains.EXPIRATION_TIME * 10);

        // getting current user id
        String userId = Long.toString(user.getId());

        // creating claims for token
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", Long.toString(user.getId()));
        claims.put("username", user.getUsername());
        claims.put("fullname", user.getFullname());
        claims.put("imageUrl", user.getImageUrl());

        //creating jwt
        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, SecurityConstrains.SECRET)
                .compact();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(SecurityConstrains.SECRET).parseClaimsJws(token);
            return true;
        }catch (SignatureException ex) {
            // TODO: handle exception
            System.out.println("Invalid Jwt Signature");
        }catch (MalformedJwtException exception) {
            // TODO: handle exception
            System.out.println("Invalid Jwt token");
        }catch (ExpiredJwtException e) {
            // TODO: handle exception
            System.out.println("Expired Jwt Token");
        }catch (UnsupportedJwtException e) {
            // TODO: handle exception
            System.out.println("Unsupported Jwt Token");
        }catch (IllegalArgumentException e) {
            // TODO: handle exception
            System.out.println("Jwt claims String is empty");
        }
        return false;
    }

    public Long getUserIdFromJwt(String token){
        Claims claims = (Jwts.parser().setSigningKey(SecurityConstrains.SECRET)).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.valueOf(id);
    }
}
