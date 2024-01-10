package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Vouchers;
import com.example.demo.model.response.onlineSales.OlBillResponse;
import com.example.demo.payment.momo.config.Environment;
import com.example.demo.payment.momo.models.QueryStatusTransactionResponse;
import com.example.demo.payment.momo.processor.QueryTransactionStatus;
import com.example.demo.payment.vnpay.config.ConfigVNPay;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLBillRepository;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.repository.onlineSales.OLVouchersRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OlBillDetailService;
import com.example.demo.service.onlineSales.OlBillService;
import com.example.demo.service.onlineSales.OlVouchersService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;
@Service
public class OlBillServiceImpl implements OlBillService {

    @Autowired
    private OLBillRepository olProductDetailRepository;

    @Autowired
    private OLBillDetailRepository olBillDetailRepository;

    @Autowired
    private OlBillDetailService olBillDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OLVouchersRepository olVouchersRepository;

    @Autowired
    private OLBillRepository olBillRepository;




    private void updateProductQuantity(BillDetail billDetail) {
        Optional<ProductDetail> productDetail = olProductDetailService.findById(billDetail.getProductDetail().getId());
        if (productDetail.isPresent()){
            int quantityToRemove = billDetail.getQuantity();
            if (isQuantityAvailable(productDetail.get(), quantityToRemove)) {
                int currentQuantity = productDetail.get().getQuantity();
                productDetail.get().setQuantity(currentQuantity - quantityToRemove);
                olProductDetailService.save(productDetail.get());
            } else {
                throw new IllegalArgumentException("Not enough quantity available for product: " + productDetail.get().getId());
            }
        }
    }

    private boolean isQuantityAvailable(ProductDetail productDetail, int quantityToRemove) {
        int currentQuantity = productDetail.getQuantity();
        return currentQuantity >= quantityToRemove;
    }


    @Override
    public ResponseEntity<?> TaoHoaDonNguoiDungChuaDangNhap(JsonNode orderData) {
        if (orderData == null) {
            return ResponseEntity.ok(0);
        }

        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(orderData, Bill.class);

        // Kiểm tra số lượng tồn của voucher trước khi sử dụng
        if (bill.getVoucher() != null){

            Vouchers existingVoucher = olVouchersRepository.findById(bill.getVoucher().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Voucher not found"));

            if (existingVoucher != null && existingVoucher.getStatus() == 1 && existingVoucher.getQuantity() > 0) {
                existingVoucher.setQuantity(existingVoucher.getQuantity() - 1);
                olVouchersRepository.save(existingVoucher);
            } else {
                return ResponseEntity.ok(3);
            }
        }

        // Kiểm tra và xử lý số lượng sản phẩm trước khi thanh toán
        List<BillDetail> billDetails = mapper.convertValue(orderData.get("billDetail"), new TypeReference<List<BillDetail>>() {});
        for (BillDetail detail : billDetails) {
            try {
                updateProductQuantity(detail);
                detail.setBill(bill);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.ok(2);
            }
        }
        // Lưu thông tin hóa đơn và chi tiết hóa đơn vào cơ sở dữ liệu
        Bill savedBill = olProductDetailRepository.save(bill);
        olBillDetailRepository.saveAll(billDetails);
        return ResponseEntity.ok(savedBill);
    }



    @Override
    public List<Bill> findAllByCustomerEntity_IdAndStatus(Long id) {
        return   olBillRepository.findAllByCustomerEntity_IdAndStatus(id,1);
    }

    @Override
    public boolean updatePaymentStatus(Long billId, int paymentStatus) {
        Optional<Bill> optionalBill = olBillRepository.findById(billId);
        if (optionalBill.isPresent()) {
            Bill bill = optionalBill.get();
            bill.setStatus(paymentStatus);
            olBillRepository.save(bill);
            return true;
        }
        return false;
    }

    private OlBillResponse mapBillToOlBillResponse(Bill bill) {
        OlBillResponse olBillResponse = new OlBillResponse();
        olBillResponse.setId(bill.getId());
        olBillResponse.setCode(bill.getCode());
        olBillResponse.setCreatedAt(bill.getCreatedAt());
        olBillResponse.setPaymentDate(bill.getPaymentDate());
        olBillResponse.setTotalAmount(bill.getTotalAmount());
        olBillResponse.setTotalAmountAfterDiscount(bill.getTotalAmountAfterDiscount());
        olBillResponse.setReciverName(bill.getReciverName());
        olBillResponse.setDeliveryDate(bill.getDeliveryDate());
        olBillResponse.setShippingFee(bill.getShippingFee());
        olBillResponse.setAddress(bill.getAddress());
        olBillResponse.setPhoneNumber(bill.getPhoneNumber());
        olBillResponse.setNote(bill.getNote());
        olBillResponse.setCustomerEntity(bill.getCustomerEntity());
        olBillResponse.setEmployee(bill.getEmployee());
        olBillResponse.setPaymentMethod(bill.getPaymentMethod());
        olBillResponse.setVoucher(bill.getVoucher());
        olBillResponse.setTypeBill(bill.getTypeBill());
//        olBillResponse.setPaymentStatus(bill.getPaymentStatus());
        olBillResponse.setStatus(bill.getStatus());
        olBillResponse.setBillDetail(olBillDetailService.findByBill_IdAndStatus(bill.getId()));
        return olBillResponse;
    }

    @Override
    public OlBillResponse findBYId(Long id) {
        Optional<Bill> bill = olBillRepository.findById(id);
        if (bill.isPresent()){
            return mapBillToOlBillResponse(bill.get());
        }
        return null;
    }

    @Override
    public Bill save(Bill bill) {
        return olBillRepository.save(bill);
    }

    @Override
    public Bill findById(Long id) {
        Optional<Bill> bill = olBillRepository.findById(id);
        if (bill.isPresent()){
            return bill.get();
        }
        return null;
    }

    @Override
    public List<Bill> findByPhoneNumber(String pn) {

        List<Bill> bill = olBillRepository.findByPhoneNumber(pn);
        if (bill.size() > 0){
            return bill;
        }

        return Collections.emptyList();
    }


}
