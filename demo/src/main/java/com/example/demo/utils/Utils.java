package com.example.demo.utils;

import com.example.demo.security.SecurityConstrains;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class Utils {




    public String generatePasswordResetToken(Long id) {

        String userId = Long.toString(id);

        String token = Jwts.builder()
                .setSubject(userId)
                .setExpiration(new Date(System.currentTimeMillis()+ SecurityConstrains.PASSWORD_TEKEN_TIEM))
                .signWith(SignatureAlgorithm.HS512, SecurityConstrains.SECRET)
                .compact();

        return token;

    }

    public static boolean hasTokenExpired(String token) {
        Claims claims = Jwts.parser().setSigningKey(SecurityConstrains.SECRET).parseClaimsJws(token).getBody();

        Date expiredDate = claims.getExpiration();

        Date now = new Date();

        return expiredDate.before(now);
    }




}
