package com.example.demo.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class DashboardController {
    @GetMapping("/index")
    public String viewDashBoard() {
        return "/admin/index";
    }

    @GetMapping("/products/colors")
    public String viewColors() {
        return "/admin/products/colors";
    }

    @GetMapping("/account/customer")
    public String viewCustomer() {
        return "/admin/account/customer";
    }

    @GetMapping("/account/address")
    public String viewAddress() {
        return "/admin/account/address";
    }

    @GetMapping("/account/favorite")
    public String ViewFavorite() {
        return "/admin/account/favorite";
    }

    @GetMapping("/account/rating")
    public String ViewRating() {
        return "/admin/account/rating";
    }

    @GetMapping("/sell-quicly")
    public String viewSellQuickly() {
        return "/admin/sell-quickly";
    }
}
