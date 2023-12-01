package com.example.demo.service.onlineSales;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartDetail;
import com.example.demo.entity.CustomerEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OlCartDetailService {

    List<CartDetail> findAllByCart_Id(Long uuid);

    CartDetail save(CartDetail gioHang);

    Optional<CartDetail> findById(Long Id);

    void deleteById(Long id);

    void deleteAllByCart_Id(Long idGioHang);



}
