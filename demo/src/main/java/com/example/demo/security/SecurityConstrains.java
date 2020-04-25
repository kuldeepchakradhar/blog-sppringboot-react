package com.example.demo.security;

public class SecurityConstrains {

    public static final String SING_UP_URLS = "/api/users/**";
    public static final String PUBLICE_URLS = "/public/**";
    public static final String SECRET = "SecretKeyToGenJWTS";
    public static final String TOKEN_PRIFIX ="Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 300_00; // 300 SECONDS;
    public static final long PASSWORD_TEKEN_TIEM = 3600000; // 1 hour


}
