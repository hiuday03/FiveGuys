package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Image;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import com.example.demo.repository.onlineSales.OlImageRepostitory;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OlImageServiceImpl implements OlImageService {

    @Autowired
    private OlImageRepostitory olImageRepostitory;


    @Override
    public List<Image> findByProductDetailId(Long productDetailId) {
        return olImageRepostitory.findByProductDetailId(productDetailId);
    }
}
