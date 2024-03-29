package com.example.demo.repository;

import com.example.demo.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RatingRepository extends JpaRepository<RatingEntity, Long> {

    @Modifying
    @Transactional
    @Query("Update RatingEntity r Set r.status = 2 where  r.id = :id")
    void updateStatusRatingXacNhan( Long id); @Modifying
    @Transactional
    @Query("Update RatingEntity r Set r.status = 3 where  r.id = :id")
    void updateStatusRatingHuy(Long id);
}
