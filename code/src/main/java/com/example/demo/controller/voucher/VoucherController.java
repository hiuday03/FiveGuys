package com.example.demo.controller.voucher;

import com.example.demo.entity.Roles;
import com.example.demo.entity.Vouchers;
import com.example.demo.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class VoucherController {

    @GetMapping("/voucher")
    public String viewEmployee(){
        return "/admin/voucher/voucher_home";
    }
}
