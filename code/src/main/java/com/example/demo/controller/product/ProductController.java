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

    @GetMapping("/tp1")
    public String product1(){
        return "admin/products/product/product-form";
    }

    @GetMapping("/tp2")
    public String product2(){
        return "admin/products/product/product-test";
    }

    @GetMapping("/tp3")
    public String product3(){
        return "admin/products/product/proform";
    }

    @GetMapping("/tp4")
    public String product4(){
        return "admin/products/product/product";
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
