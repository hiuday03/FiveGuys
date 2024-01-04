package com.example.demo.payment.paypal;


import com.example.demo.config.Config;
import com.example.demo.entity.Bill;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartDetail;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.restcontroller.onlineSales.BillRestController;
import com.example.demo.service.onlineSales.OlBillService;
import com.example.demo.service.onlineSales.OlCartDetailService;
import com.example.demo.service.onlineSales.OlCartService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.cloudinary.json.JSONArray;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import com.paypal.api.payments.Links;
 import com.paypal.api.payments.Payment;
 import com.paypal.base.rest.PayPalRESTException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@RestController
@RequestMapping("/api/ol")
public class PaypalController {

    @Autowired
    private BillRestController billRestController;

    @Autowired
    private OlBillService olBillService;

    @Autowired
    private PaypalService service;

    @Autowired
    private OlCartService olCartService;

    @Autowired
    private OlCartDetailService olCartDetailService;

    ObjectMapper mapper = new ObjectMapper();


//    @GetMapping("/home")
//    public String home() {
//        return "payment/paypal/home";
//    }
//
//    @PostMapping("/pay")
//    public String payment(@ModelAttribute("order") Order order) {
//        try {
//            Payment payment = service.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
//                    order.getIntent(), order.getDescription(), "http://localhost:8080/" + CANCEL_URL,
//                    "http://localhost:8080/" + SUCCESS_URL);
//            for(Links link:payment.getLinks()) {
//                if(link.getRel().equals("approval_url")) {
//                    System.out.println(link.getHref());
//                    return "redirect:"+link.getHref();
//                }
//            }
//
//        } catch (PayPalRESTException e) {
//
//            e.printStackTrace();
//        }
//        return "redirect:/home";
//    }

    @GetMapping("/payment-paypal/cancel")
    public void cancelPay(HttpServletResponse response) throws IOException {
        response.sendRedirect(Config.fe_liveServer_Failed);

    }

    @Transactional
    @GetMapping("/payment-paypal/success")
    public void successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, HttpServletResponse response) throws IOException {
        boolean paymentSuccessful = false;

        try {
            Payment payment = service.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                olBillService.TaoHoaDonNguoiDungChuaDangNhap(billRestController.getBillData());
                paymentSuccessful = true;
                Bill bill = mapper.convertValue(billRestController.getBillData(), Bill.class);

                if (bill.getCustomerEntity() != null){
                    Cart cart = olCartService.findByCustomerId(bill.getCustomerEntity().getId());

                    if (cart != null) {
                        olCartDetailService.deleteAllByCart_Id(cart.getId());
                    }
                }else {
                    billRestController.setCheckOutBill(true);

                }

            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }

        if (paymentSuccessful) {
            response.sendRedirect(Config.fe_liveServer_Success);
        } else {
            response.sendRedirect("http://127.0.0.1:5502/olView/index.html#!/home");
        }
    }
    private final String BASE_URL = "https://api.sandbox.paypal.com";
    private final String CLIENT_ID = "Ac21OBQ_35WAfzShaEk3Qr9qO9SRUaHZXy03GCvOrVXJQxA221qlR9alfmzNBNlkZWsIeps7j42psH55";
    private final String CLIENT_SECRET = "ELe92rT390oGQJCmz8VljrIvBuU04OSyC_g4nZ9Drhr9LFV9U7KfU9-YmNFtIdAK2ZF8TanpbDEwk5q8";

    private String getAccessToken() {
        String auth = CLIENT_ID + ":" + CLIENT_SECRET;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + encodedAuth); // Đặt tiêu đề Authorization với thông tin xác thực mã hóa
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = new RestTemplate().exchange(
                BASE_URL + "/v1/oauth2/token",
                HttpMethod.POST,
                entity,
                String.class
        );

        if (response.getStatusCode().equals(HttpStatus.OK)) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            return jsonResponse.getString("access_token");
        } else {
            return null;
        }
    }



    @GetMapping("/transactions/{orderId}")
    public ResponseEntity<String> checkTransaction(@PathVariable String orderId) {
        String accessToken = getAccessToken();
        if (accessToken == null) {
            return new ResponseEntity<>("Failed to get access token", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = new RestTemplate().exchange(
                BASE_URL + "/v2/checkout/orders/" + orderId,
                HttpMethod.GET,
                entity,
                String.class
        );

        System.out.println(response);
        JSONObject jsonResponse = new JSONObject(response.getBody());
        String status = jsonResponse.getString("status");
        System.out.println(status);
        if (response.getStatusCode().equals(HttpStatus.OK)) {
            return new ResponseEntity<>("Transaction with ID " + orderId + " is approved or not approved.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to retrieve transaction details for ID " + orderId, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private final String EXCHANGE_RATE_API = "https://openexchangerates.org/api/latest.json?base=USD&symbols=VND&app_id=8bbe0880013e4460b9b81960a33980ed";

    public BigDecimal getExchangeRate() {
        RestTemplate restTemplate = new RestTemplate();
        JsonNode response = restTemplate.getForObject(EXCHANGE_RATE_API, JsonNode.class);

        // Lấy tỷ giá từ JSON response
        JsonNode rates = response.get("rates");
        BigDecimal exchangeRate = rates.get("VND").decimalValue();

        return exchangeRate;
    }



    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder() {
        try {
            BigDecimal exchangeRate = getExchangeRate(); // Lấy tỷ giá USD/VND
            BigDecimal money = new BigDecimal("210000");
            BigDecimal totalAmountUSD = money.divide(exchangeRate, 2, RoundingMode.HALF_UP);
            Double price = Double.valueOf(String.valueOf(totalAmountUSD));
            String accessToken = getAccessToken(); // Lấy access token từ PayPal

            // Tạo thông tin đơn hàng
            JSONObject requestBody = new JSONObject();
            requestBody.put("intent", "CAPTURE");
            JSONArray purchaseUnits = new JSONArray();
            JSONObject purchaseUnit = new JSONObject();
            JSONObject amount = new JSONObject();
            amount.put("currency_code", "USD");
            amount.put("value", price);
            purchaseUnit.put("amount", amount);
            purchaseUnit.put("description", "Description of your purchase");
            purchaseUnits.put(purchaseUnit);
            requestBody.put("purchase_units", purchaseUnits);

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);

            // Gọi API tạo Order
            ResponseEntity<String> response = new RestTemplate().exchange(
                    BASE_URL + "/v2/checkout/orders",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode().equals(HttpStatus.CREATED)) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                String orderId = jsonResponse.getString("id");
                System.out.println(orderId);
                JSONObject links = jsonResponse.getJSONArray("links").getJSONObject(1);
                String redirectUrl = links.getString("href");
                return ResponseEntity.ok("Redirect user to: " + redirectUrl);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create PayPal order");
    }


    @RequestMapping(value="/api/orders", method = RequestMethod.POST)
    @CrossOrigin
    public Object createOrder2() {
        String accessToken = getAccessToken();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/json");
        headers.add("Accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        //JSON String
        String requestJson = "{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"100.00\"}}]}";
        HttpEntity<String> entity = new HttpEntity<String>(requestJson, headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                BASE_URL + "/v2/checkout/orders",
                HttpMethod.POST,
                entity,
                Object.class
        );

        if (response.getStatusCode() == HttpStatus.CREATED) {
            return response.getBody();
        } else {
            return "Unavailable to get CAPTURE ORDER, STATUS CODE " + response.getStatusCode();
        }

    }

    @GetMapping("/{orderId}")
    public ResponseEntity<String> checkTransaction2(@PathVariable String orderId) {
        try {
            Payment transactionDetails = service.getTransactionDetails(orderId);

            if (transactionDetails != null) {
                // Convert thông tin giao dịch thành JSON hoặc xử lý theo nhu cầu của bạn
                Gson gson = new Gson();
                String json = gson.toJson(transactionDetails);
                return ResponseEntity.ok(json);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error checking transaction");
        }
    }


}