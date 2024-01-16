package com.example.demo.service.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.model.response.onlineSales.OlBillResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface OlBillService {

    ResponseEntity<?> TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData);

     Page<Bill> findLatestBillsByCustomerId(Long customerId, int page, int size);

     boolean updatePaymentStatus(Long billId, int paymentStatus);

     OlBillResponse findBYId(Long id);

     Bill save(Bill bill);

    Bill findById(Long id);

    List<Bill> findByPhoneNumber(String pn);

}
