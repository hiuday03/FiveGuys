package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLBillRepository;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.service.onlineSales.OlBillService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class OlBillServiceImpl implements OlBillService {

    @Autowired
    private OLBillRepository olProductDetailRepository;

    @Autowired
    private OLBillDetailRepository olBillDetailRepository;

    @Override
    public Bill TaoHoaDonNguoiDungChuaDangNhap(JsonNode orderData) {
        if (orderData == null) {
            throw new IllegalArgumentException("orderData cannot be null");
        }

        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(orderData, Bill.class);
        Bill savedBill = olProductDetailRepository.save(bill);

        JsonNode billDetailNode = orderData.get("billDetail");
        if (billDetailNode != null && billDetailNode.isArray()) {
            TypeReference<List<BillDetail>> type = new TypeReference<>() {};
            List<BillDetail> billDetail = mapper.convertValue(billDetailNode, type)
                    .stream().peek(d -> d.setBill(savedBill)).collect(Collectors.toList());
            olBillDetailRepository.saveAll(billDetail);
        } else {
            throw new IllegalArgumentException("orderDetails must be a non-null array");
        }

        return bill;
    }
}
