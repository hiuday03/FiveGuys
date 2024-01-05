package com.example.demo.service.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.model.response.onlineSales.OlBillResponse;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface OlBillService {

    Bill TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData);

    List<Bill> findAllByCustomerEntity_IdAndStatus(Long Id);

     boolean updatePaymentStatus(Long billId, int paymentStatus);

     OlBillResponse findBYId(Long id);

     Bill save(Bill bill);

    Bill findById(Long id);

}
