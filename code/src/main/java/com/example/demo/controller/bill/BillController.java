package com.example.demo.controller.bill;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class BillController {

    @GetMapping("/newbill")
    public String product(){
        return "admin/bill/new-bill";
    }
}
