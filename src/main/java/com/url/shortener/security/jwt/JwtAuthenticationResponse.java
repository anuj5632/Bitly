package com.url.shortener.security.jwt;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String Token;

    public JwtAuthenticationResponse(String Token) {
        this.Token = Token;
    }

    public String getToken(){
        return Token;
    }
}
