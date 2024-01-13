package com.example.demo.service.serviceiplm;

import com.example.demo.entity.RatingEntity;
import com.example.demo.repository.RatingRepository;
import com.example.demo.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public List<RatingEntity> getAllRating() {
        return ratingRepository.findAll();
    }

    @Override
    public RatingEntity getRatingById(Long id) {
        return ratingRepository.findById(id).orElse(null);
    }

    @Override
    public Page<RatingEntity> getAllRatingPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return ratingRepository.findAll(pageable);
    }

    @Override
    public RatingEntity createRating(RatingEntity ratingEntity) {
        return ratingRepository.save(ratingEntity);
    }

    @Override
    public RatingEntity updateRating(RatingEntity ratingEntity, Long id) {
        Optional<RatingEntity> existingRating = ratingRepository.findById(id);
        if (existingRating.isPresent()) {
            RatingEntity rating = existingRating.get();
            rating.setContent(ratingEntity.getContent());
            rating.setRate(ratingEntity.getRate());
            rating.setCustomer(ratingEntity.getCustomer());
            rating.setBillDetail(ratingEntity.getBillDetail());
            rating.setCreatedAt(ratingEntity.getCreatedAt());
            rating.setUpdatedAt(ratingEntity.getUpdatedAt());
            rating.setStatus(ratingEntity.getStatus());

            return ratingRepository.save(rating); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
//            return null;
        }
    }

    @Override
    public void deleteRating(Long id) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (ratingRepository.existsById(id)) {
            ratingRepository.deleteById(id);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
        }
    }
}
