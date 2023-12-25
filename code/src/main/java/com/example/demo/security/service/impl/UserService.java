package com.example.demo.security.service.impl;


import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.senderMail.Respone.ResponseObject;

public interface UserService {
    ResponseObject register(UserRequestDTO userRequestDTO);
    ResponseObject reSendOTP(String mail);
//    ResponseObject active(UserRequestDTO userRequestDTO);

    ResponseObject forgotPassword(String email);

    Boolean confirmOTP(String email, String otp);

    void sendSimpleEmail(String toEmail, String text, String subject);

    boolean resetPassword(String email, String newPassword);

}
