package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OlImageRepostitory extends JpaRepository<Image, Long> {

    List<Image> findByProductDetailIdAndStatus(Long productDetailId,int status);
}
