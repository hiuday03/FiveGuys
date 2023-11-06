package com.example.demo.service.onlineSales;

import com.example.demo.entity.Bill;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.RequestBody;

public interface OlBillService {

    Bill TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData);
}
