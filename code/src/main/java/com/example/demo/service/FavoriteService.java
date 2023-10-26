package com.example.demo.service;

import com.example.demo.entity.FavoriteEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FavoriteService {
    List<FavoriteEntity> getAllFavorite();

//    Page<FavoriteEntity> getAll(Integer page);

    FavoriteEntity getFavoriteById(Long id);

    Page<FavoriteEntity> getAllFavoritePage(Integer page);

    FavoriteEntity createFavorite(FavoriteEntity favoriteEntity);

    FavoriteEntity updateFavorite(FavoriteEntity favoriteEntity, Long id);

    void deleteFavorite(Long id);

}
