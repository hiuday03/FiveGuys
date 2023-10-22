package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Material;
import com.example.demo.repository.MaterialRepository;
import com.example.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Pageable pageable = PageRequest.of(page, 1);
        return materialRepository.findAll(pageable);
    }

    @Override
    public Material getById(Long id) {
        return materialRepository.findById(id).orElse(null);
    }

    @Override
    public Material save(Material materialReq) {
        return materialRepository.save(materialReq);
    }

    @Override
    public Material update(Material materialReq, Long id) {
        Optional<Material> materialOptional = materialRepository.findById(id);
        if (materialOptional.isPresent()) {
            Material material = materialOptional.get();
            material.setName(materialReq.getName());
            material.setUpdatedAt(materialReq.getUpdatedAt());
            material.setStatus(materialReq.getStatus());
            materialRepository.save(material);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if (materialRepository.existsById(id)) {
            materialRepository.deleteById(id);
        } else {
            System.err.println("Error delete materialRepository");
        }
    }
}
