package com.example.demo.service;

import com.example.demo.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MaterialService {

    List<Material> getAll();

    Page<Material> getAll(Integer page);

    Material getById(Long id);

    Material save(Material material);

    Material update(Material material, Long id);

    void delete(Long id);
}
