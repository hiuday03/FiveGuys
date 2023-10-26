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
    public String index(){
        return "admin/products/product/product-list";
    }

    @GetMapping("/create")
    public String create(Model model){
        model.addAttribute("formtype", "add");
        return "admin/products/product/product-form";
    }

    @GetMapping("/update/{id}")
    public String update(Model model){
        model.addAttribute("formtype", "update");
        return "admin/products/product/product-form";
    }
}
