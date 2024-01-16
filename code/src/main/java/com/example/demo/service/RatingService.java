package com.example.demo.service;

import com.example.demo.entity.RatingEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface RatingService {
    List<RatingEntity> getAllRating();

//    Page<RatingEntity> getAll(Integer page);

    RatingEntity getRatingById(Long id);

    Page<RatingEntity> getAllRatingPage(Integer page);

    RatingEntity createRating(RatingEntity ratingEntity);

    RatingEntity updateRating(RatingEntity ratingEntity, Long id);

    void deleteRating(Long id);

    void updateStatusRatingXacNhan(Long id);
    void updateStatusRatingHuy(Long id);

}
