package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OLSizeRepository extends JpaRepository<Size, Long> {
}
