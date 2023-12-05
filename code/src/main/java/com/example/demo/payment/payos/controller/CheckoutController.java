package com.example.demo.payment.payos.controller;

import com.example.demo.entity.Bill;
import com.example.demo.service.onlineSales.OlBillService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lib.payos.PayOS;
import com.lib.payos.type.ItemData;
import com.lib.payos.type.PaymentData;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
@Controller
public class CheckoutController {


  private final PayOS payOS;
  public CheckoutController(PayOS payOS) {
    super();
    this.payOS = payOS;
  }

    @Autowired
    private OlBillService olBillService;

    @RequestMapping(value = "/payment/payos")
    public String Index() {
        return "payment/payos/index";
    }
    @RequestMapping(value = "/payment/payos/success")
    public String Success(@RequestParam("code") String code,
                          @RequestParam("id") String id,
                          @RequestParam("cancel") boolean isCancelled,
                          @RequestParam("status") String status,
                          @RequestParam("orderCode") String orderCode,
                          HttpSession session
                         ) {
      if(code.equals("00") && status.equals("PAID ")){
          JsonNode orderData = (JsonNode) session.getAttribute("orderData");
          olBillService.TaoHoaDonNguoiDungChuaDangNhap(orderData);
      }

        return "payment/payos/success";
    }

//    Đọc ở đây https://payos.vn/docs/du-lieu-tra-ve/return-url/

    @RequestMapping(value = "/payment/payos/cancel")
    public String Cancel() {
        return "payment/payos/cancel";
    }

//
//    @RequestMapping(method = RequestMethod.POST, value = "/create-payment-link", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
//    public void checkout(HttpServletResponse httpServletResponse, @RequestBody JsonNode orderData, HttpSession session) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            if (orderData == null) {
//                throw new IllegalArgumentException("orderData cannot be null");
//            }
//            session.setAttribute("orderData",orderData);
//            final String description = "Thanh toan don hang";
//            final String returnUrl = "http://localhost:8080/payment/payos/success";
//            final String cancelUrl = "http://localhost:8080/payment/payos/cancel";
//
//            BigDecimal totalAmountAfterDiscount = new BigDecimal(orderData.get("totalAmountAfterDiscount").asText());
//            List<ItemData> itemList = new ArrayList<>();
//            if (orderData.has("billDetail") && orderData.get("billDetail").isArray()) {
//                for (final JsonNode billDetailNode : orderData.get("billDetail")) {
//                    ItemData item = new ItemData(billDetailNode.get("productName").asText(), billDetailNode.get("quantity").asInt(), Integer.valueOf(billDetailNode.get("price").asText()));
//                    itemList.add(item);
//                }
//            }
//            String currentTimeString = String.valueOf(new Date().getTime());
//            int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
//
//            PaymentData paymentData = new PaymentData(orderCode, Integer.valueOf(String.valueOf(totalAmountAfterDiscount)), description, itemList, cancelUrl, returnUrl);
//            JsonNode data = payOS.createPaymentLink(paymentData);
//
//            String checkoutUrl = data.get("checkoutUrl").asText();
//
//            httpServletResponse.setHeader("Location", checkoutUrl);
//            httpServletResponse.setStatus(302);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//@PostMapping("/bill/create")
//    @RequestMapping(method = RequestMethod.POST, value = "/create-payment-link", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
//    public void checkout(HttpServletResponse httpServletResponse) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            final String productName = "Mì tôm hảo hảo ly";
//            final String description = "Thanh toan don hang";
//            final String returnUrl = "http://localhost:8080/payment/payos/success";
//            final String cancelUrl = "http://localhost:8080/payment/payos/cancel";
//            final int price = 1000;
//            // Gen order code
//            String currentTimeString = String.valueOf(new Date().getTime());
//            int orderCode = Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
//            ItemData item = new ItemData(productName, 1, price);
//            List<ItemData> itemList = new ArrayList<>();
//            itemList.add(item);
//            PaymentData paymentData = new PaymentData(orderCode, price, description,
//                    itemList, cancelUrl, returnUrl);
//            JsonNode data = payOS.createPaymentLink(paymentData);
//
//            String checkoutUrl = data.get("checkoutUrl").asText();
//
//            httpServletResponse.setHeader("Location", checkoutUrl);
//            httpServletResponse.setStatus(302);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

}