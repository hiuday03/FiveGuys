package com.example.demo.service.onlineSales;

import com.example.demo.entity.Image;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OlImageService {

    List<Image> findByProductDetailId(Long productDetailId);

}
