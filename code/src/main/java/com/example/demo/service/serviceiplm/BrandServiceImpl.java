package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Brands;
import com.example.demo.repository.BrandRepository;
import com.example.demo.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brands> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Page<Brands> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return brandRepository.findAll(pageable);
    }

    @Override
    public Brands getById(Long id) {
        return brandRepository.findById(id).orElse(null);
    }

    @Override
    public Brands save(Brands brands) {
        return brandRepository.save(brands);
    }
    @Override
    public Brands update(Brands brands, Long id) {
        Optional<Brands> existingBrandOptional = brandRepository.findById(id);

        if (existingBrandOptional.isPresent()) {
            Brands existingBrand = existingBrandOptional.get();

            // Update the existing brand with the new values
            existingBrand.setName(brands.getName());
            existingBrand.setCreatedAt(brands.getCreatedAt());
            existingBrand.setUpdatedAt(brands.getUpdatedAt());
            existingBrand.setStatus(brands.getStatus());
            // Update createdAt and updatedAt if needed

            Brands updatedBrand = brandRepository.save(existingBrand); // Save the updated brand

            return updatedBrand; // Return the updated brand
        } else {
            throw new IllegalArgumentException("Không tìm thấy Brand với ID " + id);
        }
    }


    @Override
    public void delete(Long id) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (brandRepository.existsById(id)) {
            brandRepository.deleteById(id);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
        }
    }

    @Override
    public Brands updateStatus(Long id) {
        return null;
    }
}
