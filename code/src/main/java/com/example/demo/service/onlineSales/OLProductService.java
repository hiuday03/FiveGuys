package com.example.demo.service.onlineSales;

import com.example.demo.entity.Product;
import com.example.demo.model.response.onlineSales.OlDetailProductRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductRespone;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface OLProductService {

    List<Product> getAllProducts();

    Page<OlHomeProductRespone> getAllOlProductsRespone(Integer page);

    List<OlHomeProductRespone> getAllOlProductsRespone();

    Optional<Product> findById(Long id);

    OlDetailProductRespone getOlDetailProductResponeById(Long id);
}
