package com.example.demo.service.onlineSales;


import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.model.response.onlineSales.OlFavoritesAddResponse;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OlFavoritesService {

//    List<OlFavoritesResponse> getFavoriteListByUsername(String username);

   void deleteFavorite(Long id);

    Integer addFavorite(OlFavoritesAddResponse addressRequest);

    Page<OlFavoritesResponse> findAllByCustomer(Long customerId, int page, int size);
}
