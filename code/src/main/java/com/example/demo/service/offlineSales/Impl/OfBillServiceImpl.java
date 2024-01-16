package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.ProductDetailRepository;
import com.example.demo.repository.offlineSales.BillDetailOfflineSalesRepository;
import com.example.demo.repository.offlineSales.BillOfflineSalesRepository;
import com.example.demo.service.offlineSales.OfBillService;
import com.example.demo.service.offlineSales.OfVoucherService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OfBillServiceImpl implements OfBillService {
    @Autowired
    private BillOfflineSalesRepository billRepository;

    @Autowired
    private BillDetailOfflineSalesRepository billDetailRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private OfVoucherService ofVoucherService;

    private boolean isQuantityAvailable(ProductDetail productDetail, int quantityToRemove) {
        int currentQuantity = productDetail.getQuantity();
        return currentQuantity >= quantityToRemove;
    }

    @Override
    public Bill create(JsonNode data) {
        if (data == null) {
            throw new IllegalArgumentException("orderData cannot be null");
        }
        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(data, Bill.class);
        if (bill.getVoucher() != null && ofVoucherService.getOne(bill.getVoucher().getId()).getStatus() != 1) {
            return null;
        }
        JsonNode billDetailNode = data.get("billDetail");
        bill.setStatus(3);
        bill.setPaymentDate(new Date());
        Bill saveBill = billRepository.save(bill);
        if (saveBill.getVoucher() != null) {
            ofVoucherService.update(saveBill.getVoucher().getId(), saveBill.getVoucher());
        }
        if (billDetailNode != null && billDetailNode.isArray()) {
            TypeReference<List<BillDetail>> type = new TypeReference<>() {};
            List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type)
                    .stream().peek(d -> d.setBill(bill)).collect(Collectors.toList());
             List<BillDetail> lstBillDT = billDetailRepository.saveAll(billDetails);
             List<ProductDetail> updateProductDetails = lstBillDT.stream()
                     .map(billDetail -> {
                         ProductDetail productDetail = productDetailRepository.
                                 findById(billDetail.getProductDetail().getId()).orElse(null);
                         if(billDetail.getQuantity() > productDetail.getQuantity()) {
                             billRepository.delete(saveBill);
                             return null;
                         }
                         int currentQuantity = productDetail.getQuantity();
                         int billDetailQuantity = billDetail.getQuantity();
                         int newQuantity = currentQuantity - billDetailQuantity;
                         if (newQuantity == 0) {
                             productDetail.setStatus(2);
                         }
                         productDetail.setQuantity(newQuantity);
                         return productDetail;
                     }).collect(Collectors.toList());
             if (updateProductDetails != null) {
                 productDetailRepository.saveAll(updateProductDetails);
             } else {
                 return null;
             }
        } else {
            throw new IllegalArgumentException("orderDetails must be a non-null array");
        }
        return bill;
    }
}
