package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.model.request.onlineSales.accountManage.AccountChangePass;
import com.example.demo.model.request.onlineSales.accountManage.UserInfoRequest;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class OlAccountInfoRestController {

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private UserService userService;


    @PostMapping("/updateUser")
    public boolean updateUser(@RequestBody UserInfoRequest userInfoRequest) {
        return olAccountService.updateUser(userInfoRequest);
    }

    @PostMapping("/resetPassword")
    public boolean resetPassword(@RequestBody AccountChangePass userInfoRequest) {
        return userService.resetPassword2(userInfoRequest.getUsername(), userInfoRequest.getNewPassword());
    }

}
