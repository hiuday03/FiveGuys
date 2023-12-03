package com.example.demo.repository;

import com.example.demo.entity.Brands;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brands, Long> {
}
