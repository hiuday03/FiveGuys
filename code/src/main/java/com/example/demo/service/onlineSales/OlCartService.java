package com.example.demo.service.onlineSales;

import com.example.demo.entity.Cart;
import com.example.demo.entity.ProductDetail;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;
import java.util.UUID;

public interface OlCartService {

    Cart findByCustomerId(Long id);

    Cart save(Cart gioHang);


    Object saveAllProductDetail(JsonNode orderData);
}
