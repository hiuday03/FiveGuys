package com.example.demo.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin")
public class DashboardController {
    @GetMapping("/index")
    public String viewDashBoard() {
        return "/admin/index";
    }

    @GetMapping("/products/colors")
    public String viewColors() {
        return "/admin/products/colors";
    }

    @GetMapping("sell-quicly")
    public String viewSellQuickly() {
        return "/admin/sell-quickly";
    }
}
