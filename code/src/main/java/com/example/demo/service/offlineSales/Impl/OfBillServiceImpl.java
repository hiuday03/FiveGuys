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

import java.util.*;
import java.util.function.Function;
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

        // Check if billDetailNode is not null and is an array
        if (billDetailNode != null && billDetailNode.isArray()) {
            TypeReference<List<BillDetail>> type = new TypeReference<>() {};
            List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type)
                    .stream().peek(d -> d.setBill(bill)).collect(Collectors.toList());

            // Get all product IDs from billDetails
            Set<Long> productIds = billDetails.stream()
                    .map(detail -> detail.getProductDetail().getId())
                    .collect(Collectors.toSet());

            // Fetch all productDetails in one go
            Map<Long, ProductDetail> productDetailMap = productDetailRepository.findAllById(productIds).stream()
                    .collect(Collectors.toMap(ProductDetail::getId, Function.identity()));

            // Validate quantities and update productDetails
            boolean allProductQuantitiesSufficient = billDetails.stream().allMatch(billDetail -> {
                ProductDetail productDetail = productDetailMap.get(billDetail.getProductDetail().getId());

                if (productDetail == null || billDetail.getQuantity() > productDetail.getQuantity()) {
                    return false;  // Insufficient quantity for at least one product
                }

                int currentQuantity = productDetail.getQuantity();
                int billDetailQuantity = billDetail.getQuantity();
                int newQuantity = currentQuantity - billDetailQuantity;

                if (newQuantity == 0) {
                    productDetail.setStatus(2);
                }

                productDetail.setQuantity(newQuantity);
                return true;  // Quantity is sufficient for this product
            });

            if (allProductQuantitiesSufficient) {
                if (saveBill.getVoucher() != null) {
                    ofVoucherService.update(saveBill.getVoucher().getId(), saveBill.getVoucher());
                }
                billDetailRepository.saveAll(billDetails);
                productDetailRepository.saveAll(productDetailMap.values());
            } else {
                // Insufficient quantity for at least one product, rollback changes
                billRepository.delete(saveBill);
                return null;
            }
        } else {
            throw new IllegalArgumentException("orderDetails must be a non-null array");
        }

        return saveBill;
    }
}
