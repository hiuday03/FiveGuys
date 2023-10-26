package com.example.demo.controller.product;

import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/product1")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("")
    public String index(Model model){
        model.addAttribute("products", productService.getAll());
        return "admin/products/product-list";
    }
}
