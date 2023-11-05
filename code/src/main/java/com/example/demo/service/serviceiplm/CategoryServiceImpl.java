package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<Category> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category update(Category categoryReq, Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        System.out.println(categoryOptional);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(categoryReq.getName());
            category.setUpdatedAt(categoryReq.getUpdatedAt());
            category.setStatus(categoryReq.getStatus());
            System.out.println(category);
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            System.err.println("Error delete CategoryserviceImpl");
        }
    }

    @Override
    public Category updateStatus(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        System.out.println(categoryOptional);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setStatus(3);
            return categoryRepository.save(category);
        }
        return null;
    }
}
