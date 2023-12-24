package com.example.demo.security.util;

import com.example.demo.entity.AccountEntity;
import com.example.demo.security.Request.UserRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class Helper {
    public UserRequestDTO getUser(String account, List<UserRequestDTO> list){
        return list.stream().filter(user -> user.getAccount().equals(account)).findAny().orElse(null);
    }

    public String generateOTP(){
        Random random = new Random();
        String otp =String.valueOf(100000 + random.nextInt(9000000));
        return otp;
    }

}
