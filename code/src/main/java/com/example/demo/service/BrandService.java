package com.example.demo.service;

import com.example.demo.entity.Brands;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BrandService {

    List<Brands> getAll();

    Page<Brands> getAll(Integer page);

    Brands getById(Long id);

    Brands save(Brands brands);

    Brands update(Brands brands, Long id);

    void delete(Long id);

    Brands updateStatus(Long id);

}
