package com.example.demo.security;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class AuthController {

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/auth/login/form")
    public String form(Model model){
        return "login/index";

    }

    @GetMapping("/auth/login/success")
    public String success(Model model){
        model.addAttribute("message","Dang nhap thanh cong");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        model.addAttribute("name",authentication);
        return "forward:/auth/login/form";
    }


    @GetMapping("/auth/login/error")
    public String error(Model model){
        model.addAttribute("message","Sai thong tin dang nhap");
        return "forward:/auth/login/form";
    }

    @GetMapping("/auth/logoff/success")
    public String logoff(Model model){
        model.addAttribute("message","Dang xuat thanh cong bấm login mới có thể đăng nhập tiếp");
        return "forward:/auth/login/form";
    }

    @GetMapping("/auth/access/denied")
    public String denied(Model model){
        model.addAttribute("message","Ban ko co quyen truy xuat");
        return "login/index";
    }

}