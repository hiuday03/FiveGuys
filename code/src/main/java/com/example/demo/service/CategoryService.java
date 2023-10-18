package com.example.demo.service;

import com.example.demo.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    List<Category> getAll();

    Page<Category> getAll(Integer page);

    Category getById(Long id);

    Category save(Category category);

    Category update(Category category, Long id);

    void delete(Long id);
}