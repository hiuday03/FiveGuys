package com.example.demo.controller.product;

import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class ProductController {

    @GetMapping("/product1")
    public String product(){
        return "admin/products/product/product-list";
    }

    @GetMapping("/category")
    public String index(){
        return "admin/products/category/category-list";
    }

    @GetMapping("/material")
    public String material(){
        return "admin/products/material/material-list";
    }

    @GetMapping("/color")
    public String color(){
        return "admin/products/color/color-list";
    }
}
