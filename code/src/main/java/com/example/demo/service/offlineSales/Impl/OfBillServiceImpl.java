package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.repository.offlineSales.BillDetailOfflineSalesRepository;
import com.example.demo.repository.offlineSales.BillOfflineSalesRepository;
import com.example.demo.service.offlineSales.OfBillService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfBillServiceImpl implements OfBillService {
    @Autowired
    private BillOfflineSalesRepository billRepository;

    @Autowired
    private BillDetailOfflineSalesRepository billDetailRepository;

    @Override
    public Bill create(JsonNode data) {
        if (data == null) {
            throw new IllegalArgumentException("orderData cannot be null");
        }
        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(data, Bill.class);
        Bill saveBill = billRepository.save(bill);
        JsonNode billDetailNode = data.get("billDetail");
        if (billDetailNode != null && billDetailNode.isArray()) {
            TypeReference<List<BillDetail>> type = new TypeReference<>() {};
            List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type)
                    .stream().peek(d -> d.setBill(saveBill)).collect(Collectors.toList());
            billDetailRepository.saveAll(billDetails);
        } else {
            throw new IllegalArgumentException("orderDetails must be a non-null array");
        }
        return bill;
    }
}
