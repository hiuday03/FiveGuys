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

    @GetMapping("/myprofile")
    public String viewMyProfile() {
        return "/admin/myprofile";
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

    @GetMapping("/account/account")
    public String ViewAccount() {
        return "/admin/account/account";
    }

    @GetMapping("/account/role")
    public String ViewRole() {
        return "/admin/account/role";
    }

    @GetMapping("/bill")
    public String ViewBill() {
        return "/admin/bill/bill";
    }

    @GetMapping("/sell-quicly")
    public String viewSellQuickly() {
        return "/admin/sell-quickly";
    }
}
