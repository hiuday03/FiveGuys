package com.example.demo.repository.offlineSales;

import com.example.demo.entity.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfCardRepositrory extends JpaRepository<Cards, Long> {
}
