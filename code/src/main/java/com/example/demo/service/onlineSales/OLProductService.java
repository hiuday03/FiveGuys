package com.example.demo.service.onlineSales;

import com.example.demo.entity.Product;
import com.example.demo.model.response.onlineSales.OlProductRespone;

import java.util.List;

public interface OLProductService {

    List<Product> getAllProducts();

    List<OlProductRespone> getAllOlProductsRespone();
}
