package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OLCategoryRepository extends JpaRepository<Category, Long> {
}
