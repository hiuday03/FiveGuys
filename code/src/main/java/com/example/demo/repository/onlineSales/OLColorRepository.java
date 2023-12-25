package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OLColorRepository extends JpaRepository<Color, Long> {
}
