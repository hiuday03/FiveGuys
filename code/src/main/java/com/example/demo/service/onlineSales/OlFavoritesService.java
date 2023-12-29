package com.example.demo.service.onlineSales;


import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.FavoriteEntity;

import java.util.List;

public interface OlFavoritesService {

   List<FavoriteEntity> getFavoriteListByUsername(String username);

   void deleteFavorite(Long id);

    boolean addFavorite(FavoriteEntity addressRequest);
}
