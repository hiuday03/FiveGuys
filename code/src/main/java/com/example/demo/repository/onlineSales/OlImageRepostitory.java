package com.example.demo.repository;

import com.example.demo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepostitory extends JpaRepository<Image, Long> {

    List<Image> findByProductDetailId(Long productDetailId);

}
