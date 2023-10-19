package com.example.demo.service;

import com.example.demo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {

    List<Product> getAll();

    Page<Product> getAll(Integer page);

    Product getById(Long id);

    Product save(Product product);

    Product update(Product product, Long id);

    void delete(Long id);
}
