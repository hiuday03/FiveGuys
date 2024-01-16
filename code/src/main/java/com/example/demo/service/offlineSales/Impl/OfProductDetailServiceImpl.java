package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.offlineSales.OfModelProductDetail;
import com.example.demo.repository.offlineSales.OfProductDetailRepository;
import com.example.demo.service.offlineSales.OfProductDetailService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfProductDetailServiceImpl implements OfProductDetailService {
    @Autowired
    private OfProductDetailRepository repository;
    @Override
    public List<OfModelProductDetail> getAll() {
        return repository.getAll();
    }

    @Override
    public OfModelProductDetail getByBarCode(String barcode) {
        return repository.getByBarcode(barcode);
    }

//    @Override
//    public List<ProductDetail> updateQuantity(JsonNode data) {
//        if (data == null) {
//            throw new IllegalArgumentException("orderData cannot be null");
//        }
//        ObjectMapper mapper = new ObjectMapper();
//        Bill bill = mapper.convertValue(data, Bill.class);
//        JsonNode billDetailNode = data.get("billDetail");
//        if (billDetailNode != null && billDetailNode.isArray()) {
//            TypeReference<List<BillDetail>> type = new TypeReference<>() {};
//            List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type);
//
//        }
//        return null;
//    }


}
