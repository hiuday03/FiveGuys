package com.example.demo.service.serviceiplm;

import com.example.demo.entity.FavoriteEntity;
import com.example.demo.repository.FavoriteRepository;
import com.example.demo.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FavoriteServiceImpl(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Override
    public List<FavoriteEntity> getAllFavorite() {
        return favoriteRepository.findAll();
    }

    @Override
    public FavoriteEntity getFavoriteById(Long id) {
        return favoriteRepository.findById(id).orElse(null);
    }

    @Override
    public Page<FavoriteEntity> getAllFavoritePage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return favoriteRepository.findAll(pageable);
    }

    @Override
    public FavoriteEntity createFavorite(FavoriteEntity favoriteEntity) {
        return favoriteRepository.save(favoriteEntity);
    }

    @Override
    public FavoriteEntity updateFavorite(FavoriteEntity favoriteEntity, Long id) {
        Optional<FavoriteEntity> existingFavorite = favoriteRepository.findById(id);
        if (existingFavorite.isPresent()) {
            FavoriteEntity favorite = existingFavorite.get();
            favorite.setCustomer(favoriteEntity.getCustomer());
            favorite.setProductDetail(favoriteEntity.getProductDetail());
            favorite.setCreatedAt(favoriteEntity.getCreatedAt());
            favorite.setUpdatedAt(favoriteEntity.getUpdatedAt());
            favorite.setStatus(favoriteEntity.getStatus());

            return favoriteRepository.save(favorite); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
//            return null;
        }
    }

    @Override
    public void deleteFavorite(Long id) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
        }
    }
}
