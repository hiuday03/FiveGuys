package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Brands;
import com.example.demo.repository.BrandRepository;
import com.example.demo.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

//    @Override
//    public Brands save(Brands brands) {
//        String name = brands.getName();
//        Brands existingBrand = brandRepository.findByName(name);
//        if (existingBrand != null) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tên thương hiệu đã tồn tại");
//        }
//        return brandRepository.save(brands);
//    }

    @Override
    public Brands save(Brands brands) {
        String name = brands.getName();
        // Kiểm tra xem tên thương hiệu đã tồn tại trong cơ sở dữ liệu chưa
        Brands existingBrand = brandRepository.findByName(name);
        if (existingBrand != null) {
            throw new IllegalArgumentException("Tên thương hiệu đã tồn tại");
        }
        // Nếu không có trùng lặp, lưu thương hiệu mới vào cơ sở dữ liệu
        return brandRepository.save(brands);
    }

    @Override
    public Brands update(Brands brands, Long id) {
        Optional<Brands> existingBrandOptional = brandRepository.findById(id);

        if (existingBrandOptional.isPresent()) {
            Brands existingBrand = existingBrandOptional.get();

            // Kiểm tra xem tên thương hiệu mới đã tồn tại trong cơ sở dữ liệu chưa
            Brands brandWithSameName = brandRepository.findByName(brands.getName());
            if (brandWithSameName != null && !brandWithSameName.getId().equals(existingBrand.getId())) {
                throw new IllegalArgumentException("Tên thương hiệu đã tồn tại");
            }

            // Cập nhật thông tin thương hiệu
            existingBrand.setName(brands.getName());
            existingBrand.setCreatedAt(brands.getCreatedAt());
            existingBrand.setUpdatedAt(brands.getUpdatedAt());
            existingBrand.setStatus(brands.getStatus());
            // Cập nhật createdAt và updatedAt nếu cần

            Brands updatedBrand = brandRepository.save(existingBrand); // Lưu thông tin thương hiệu đã cập nhật

            return updatedBrand; // Trả về thông tin thương hiệu đã cập nhật
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
