package com.url.shortener.security.jwt;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String Token;

    public JwtAuthenticationResponse(String token) {
        Token = token;
    }
}
