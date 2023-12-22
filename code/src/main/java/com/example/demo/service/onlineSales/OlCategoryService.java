package com.example.demo.service.onlineSales;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Category;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OlCategoryService {

  List<Category>  findAll();

  Category findCategoryByProductId( Long productId);
}
