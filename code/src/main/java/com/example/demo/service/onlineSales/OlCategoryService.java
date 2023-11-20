package com.example.demo.service.onlineSales;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Category;

import java.util.List;
import java.util.Optional;

public interface OlCategoryService {

  List<Category>  findAll();
}
