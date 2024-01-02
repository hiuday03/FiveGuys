package com.example.demo.service.onlineSales;


import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;

import java.util.List;

public interface OlFavoritesService {

    List<OlFavoritesResponse> getFavoriteListByUsername(String username);

   void deleteFavorite(Long id);

    boolean addFavorite(FavoriteEntity addressRequest);

}
