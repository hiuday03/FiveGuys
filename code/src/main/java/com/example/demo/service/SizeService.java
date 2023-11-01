package com.example.demo.service;

import com.example.demo.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface SizeService {

    List<Size> getAll();

    Page<Size> getAll(Integer page);

    Size getById(Long id);

    Size save(Size size);

    Size update(Size size, Long id);

    void delete(Long id);

    Size updateStatus(Long id);
}
