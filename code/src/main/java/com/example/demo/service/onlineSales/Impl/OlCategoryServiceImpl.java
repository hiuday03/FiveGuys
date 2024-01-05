package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Category;
import com.example.demo.repository.onlineSales.OLCategoryRepository;
import com.example.demo.service.onlineSales.OlCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class OlCategoryServiceImpl implements OlCategoryService {

    @Autowired
    private OLCategoryRepository repository;

    @Override
    public List<Category> findAll() {
        return repository.findAllByStatusEqualsOne();
    }

    @Override
    public Category findCategoryByProductId(Long productId) {
        return repository.findCategoryByProductId(productId);
    }
}
