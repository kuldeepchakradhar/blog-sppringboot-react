package com.example.demo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
public class MailService {

    final String fromTo = "kuldeepchakradhar2@gmail.com";

    private MailCustructor mailCustructor;

    public MailService(MailCustructor mailCustructor){
        this.mailCustructor = mailCustructor;
    }


    public boolean sendPasswordResetToken(String name, String username, String token){

        String HTMLBody= "<h1>A request to reset your password</h1"
                +"<p>Hi, "+name+"!</p>"
                +"<p>click to blow link</p>"
                +"<a href='http://localhost:3000/password-reset-token?token="+token+">click here</a><br/><br/>"
                +"Thank you!";

        // setting up the credentials
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(mailCustructor.getHost());
        javaMailSender.setPort(mailCustructor.getPort());
        javaMailSender.setUsername(mailCustructor.getUsername());
        javaMailSender.setPassword(mailCustructor.getPassword());

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(mailCustructor.getUsername());
        mailMessage.setTo(username);
        mailMessage.setSubject("Password recovery mail "+name);
        mailMessage.setText(HTMLBody);

        javaMailSender.send(mailMessage);

        return true;

    }
}

