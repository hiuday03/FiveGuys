package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.service.onlineSales.OlBillService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.lib.payos.PayOS;
import com.lib.payos.type.ItemData;
import com.lib.payos.type.PaymentData;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/api/ol")
public class BillRestController {


    private final PayOS payOS;

    public BillRestController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

    @Autowired
    private OlBillService olBillService;

    ObjectMapper mapper = new ObjectMapper();


    @PostMapping("/bill/create")
    public ResponseEntity<?> TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData, HttpSession session) {
        Bill bill = mapper.convertValue(orderData, Bill.class);

        String namePayment = bill.getPaymentMethod().getName();

        if (namePayment.equals("QR")) {
            try {
                if (orderData == null) {
                    throw new IllegalArgumentException("orderData cannot be null");
                }
                session.setAttribute("orderData", orderData);
                final String description = "Thanh toan don hang";
                final String returnUrl = "http://localhost:8080/payment/payos/success";
                final String cancelUrl = "http://localhost:8080/payment/payos/cancel";

                BigDecimal totalAmountAfterDiscount = new BigDecimal(String.valueOf(bill.getTotalAmountAfterDiscount()));
                List<ItemData> itemList = new ArrayList<>();
                JsonNode billDetailNode = orderData.get("billDetail");

                if (billDetailNode != null && billDetailNode.isArray()) {
                    TypeReference<List<BillDetail>> type = new TypeReference<>() {
                    };
                    List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type);

                    for (BillDetail billDetail : billDetails) {
                        String productName = "Hello";
                        int quantity = billDetail.getQuantity(); // Thay bằng phương thức lấy số lượng từ BillDetail
                        int price = Integer.valueOf(String.valueOf(billDetail.getPrice())); // Thay bằng phương thức lấy giá từ BillDetail

                        ItemData item = new ItemData(productName, quantity, price);
                        itemList.add(item);
                    }
                }
                String currentTimeString = String.valueOf(new Date().getTime());
                int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
                PaymentData paymentData = new PaymentData(orderCode, Integer.valueOf(String.valueOf(totalAmountAfterDiscount)), description, itemList, cancelUrl, returnUrl);
                JsonNode data = payOS.createPaymentLink(paymentData);

                String checkoutUrl = data.get("checkoutUrl").asText();
                Map<String, String> jsonResponse = new HashMap<>();
                jsonResponse.put("rederect", checkoutUrl);
                Gson gson = new Gson();
                String json = gson.toJson(jsonResponse);
                return ResponseEntity.ok(json);

            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (namePayment.equals("VNP")) {
//           return ResponseEntity.ok(olBillService.TaoHoaDonNguoiDungChuaDangNhap(orderData));

        }
        return null;

    }

}
