package com.vnpt.quizz_education_be.Login;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vnpt.quizz_education_be.Entity.TaiKhoan;
import com.vnpt.quizz_education_be.Entity.TaiKhoanJWT;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;


@Component
public class JwtTokenProvider {

  private static final String SECRET_KEY = "quizzeducation2023";
  // private static final long EXPIRATION_TIME = 60 * 60 * 1000; // 60 minutes

  // Phương thức create token với thời gian được set tùy ý
  public String createToken(TaiKhoan account_Confim,int i) throws JsonProcessingException {
    // Create a token with the username and expiration time
    Date expirationDate = new Date(System.currentTimeMillis() + i);
  
    // Convert the object to JSON

    ObjectMapper mapper = new ObjectMapper();
    String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(account_Confim);
    return Jwts.builder()
        .setSubject(json)
        .setExpiration(expirationDate)
        .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
        .compact();
  }

  public boolean validateToken(String token) {
    try {
      // Validate the token
      Jws<Claims> claims = Jwts.parser()
          .setSigningKey(SECRET_KEY)
          .parseClaimsJws(token);

      // Check if the token has expired
      return claims.getBody().getExpiration().after(new Date());
    } catch (JwtException e) {
      // The token is invalid
      return false;
    }
  }

  public String getUsernameFromToken(String token) {
    // Get the username from the token claims
    Jws<Claims> claims = Jwts.parser()
        .setSigningKey(SECRET_KEY)
        .parseClaimsJws(token);
    return claims.getBody().getSubject();
  }

}
