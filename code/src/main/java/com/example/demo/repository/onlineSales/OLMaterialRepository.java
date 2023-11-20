package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OLMaterialRepository extends JpaRepository<Material, Long> {
}
