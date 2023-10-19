package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Material;
import com.example.demo.repository.MaterialRepository;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    MaterialRepository materialRepository;

    @Override
    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    @Override
    public Page<Material> getAll(Integer page) {
        return null;
    }

    @Override
    public Material getById(Long id) {
        return materialRepository.findById(id).get();
    }

    @Override
    public Material save(Material material) {
        return null;
    }

    @Override
    public Material update(Material material, Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
