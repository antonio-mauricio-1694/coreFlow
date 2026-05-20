package com.coreflow.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class JwtService {

    private static final String SECRET_KEY = "coreflow-secret-key";

    public String generateToken(String email) {

        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

        return JWT.create()
                .withSubject(email)
                .withExpiresAt(
                        Instant.now().plus(2, ChronoUnit.HOURS)
                )
                .sign(algorithm);
    }
}