package com.example.demo.service.offlineSales;

import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.offlineSales.OfModelProductDetail;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public interface OfProductDetailService {
    List<OfModelProductDetail> getAll();

//    List<ProductDetail> updateQuantity(JsonNode data);
}
