package com.example.demo.security;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try{
            // stored token except bearer in jwt
            String jwt = getJwtFromRequest(request);

            if(StringUtils.hasText(jwt)&&jwtTokenProvider.validateToken(jwt)) {
                //geting user id
                Long userId = jwtTokenProvider.getUserIdFromJwt(jwt);
                User userDetails = userServiceImpl.findUserById(userId);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                  userDetails, null, new ArrayList<>()
                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }

        }catch (Exception e){
            logger.error("could not set authentication ",e);
        }

        filterChain.doFilter(request, response);

    }


    public String getJwtFromRequest(HttpServletRequest request){
        //getting header from jwts
        String tokenHeader = request.getHeader(SecurityConstrains.HEADER_STRING);

        // validation if has text and contains our right token prifix
        if(StringUtils.hasText(tokenHeader) && tokenHeader.startsWith(SecurityConstrains.TOKEN_PRIFIX)){
            // returning only except bearer
            return tokenHeader.substring(7, tokenHeader.length());
        }

        return null;
    }
}
