
package com.itstrat.acmf.apis.config;


import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtGenerator{

    static SecretKey key=Keys.hmacShaKeyFor(JwtConstant.secret_key.getBytes());

    public static String generateToken(Authentication auth) {


        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+86400000))
                .claim("email",auth.getName())
                .signWith(key)
                .compact();


    }

    public static String getEmailFromJwtToken(String jwt) {
        if (jwt == null || jwt.isBlank()) {
            throw new IllegalArgumentException("Authorization token is missing");
        }
        String token = jwt.trim();
        if (token.length() > 7 && token.regionMatches(true, 0, "Bearer ", 0, 7)) {
            token = token.substring(7).trim();
        }
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
        Object emailClaim = claims.get("email");
        if (emailClaim == null) {
            throw new IllegalArgumentException("JWT has no email claim");
        }
        String email = String.valueOf(emailClaim).trim();
        if (email.isEmpty() || "null".equalsIgnoreCase(email)) {
            throw new IllegalArgumentException("JWT email claim is empty");
        }
        return email;
    }


}
