package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Cart;
import com.example.demo.entity.ProductDetail;
import com.example.demo.payment.momo.config.Environment;
import com.example.demo.payment.momo.enums.RequestType;
import com.example.demo.payment.momo.models.PaymentResponse;
import com.example.demo.payment.momo.processor.CreateOrderMoMo;
import com.example.demo.payment.paypal.PaypalService;
import com.example.demo.payment.vnpay.config.ConfigVNPay;
import com.example.demo.service.onlineSales.*;
import com.example.demo.untility.OlBillUntility;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.lib.payos.PayOS;
import com.lib.payos.type.ItemData;
import com.lib.payos.type.PaymentData;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class BillRestController {

    boolean checkOutBill = false;


    public boolean isCheckOutBill() {
        return checkOutBill;
    }

    public void setCheckOutBill(boolean checkOutBill) {
        this.checkOutBill = checkOutBill;
    }


    @Autowired
    private OlBillService olBillService;

    @Autowired
    private PaypalService paypalService;

    @Autowired
    private OlCartService olCartService;

    @Autowired
    private OlBillUntility olBillUntility;

    @Autowired
    private OlCartDetailService olCartDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    ObjectMapper mapper = new ObjectMapper();


    @Transactional
    @PostMapping("/bill/create")
    public ResponseEntity<?> TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData, HttpServletResponse  response, HttpServletRequest req, HttpSession session) throws IOException {




        ResponseEntity<?> newBill = olBillService.TaoHoaDonNguoiDungChuaDangNhap(orderData);
        Object body = newBill.getBody();
        if (body != null && body instanceof Bill) {
            Bill billData = (Bill) body;

            BigDecimal totalAmountAfterDiscount = new BigDecimal(String.valueOf(billData.getTotalAmountAfterDiscount()));
            String describe = String.valueOf(billData.getNote());
            String namePayment = billData.getPaymentMethod().getName();

            String codeBill = String.valueOf(olBillUntility.encodeId(billData.getId()));


            //        if (namePayment.equals("QR")) {
//            try {
//                if (orderData == null) {
//                    throw new IllegalArgumentException("orderData cannot be null");
//                }
//                final String description = "Thanh toán đơn hàng";
//                final String returnUrl = "http://localhost:8080/api/ol/payment-payos/success";
//                final String cancelUrl = "http://localhost:8080/api/ol/payment-payos/cancel";
//
//                List<ItemData> itemList = new ArrayList<>();
//                JsonNode billDetailNode = orderData.get("billDetail");
//
//                if (billDetailNode != null && billDetailNode.isArray()) {
//                    TypeReference<List<BillDetail>> type = new TypeReference<>() {
//                    };
//                    List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type);
//
//                    for (BillDetail billDetail : billDetails) {
//                        String productName = "Hello";
//                        int quantity = billDetail.getQuantity();
//                        int price = Integer.valueOf(String.valueOf(billDetail.getPrice()));
//
//                        ItemData item = new ItemData(productName, quantity, price);
//                        itemList.add(item);
//                    }
//                }
//                int orderCode = Integer.parseInt(codeBill);
//                PaymentData paymentData = new PaymentData(orderCode, Integer.valueOf(String.valueOf(totalAmountAfterDiscount)), description, itemList, cancelUrl, returnUrl);
//                System.out.println(paymentData);
//
//                JsonNode data = payOS.createPaymentLink(paymentData);
//                String checkoutUrl = data.get("checkoutUrl").asText();
//
//                Map<String, String> jsonResponse = new HashMap<>();
//                jsonResponse.put("rederect", checkoutUrl);
//                Gson gson = new Gson();
//                String json = gson.toJson(jsonResponse);
//                return ResponseEntity.ok(json);
//
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        } else
            if (namePayment.equals("VNPAY")) {
                olBillUntility.scheduleBillDeletion(billData.getId());

                String vnp_Version = "2.1.0";
                String vnp_Command = "pay";
                String orderType = "other";


                String vnp_IpAddr = ConfigVNPay.getIpAddress(req);

                String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;

                Map<String, String> vnp_Params = new HashMap<>();
                vnp_Params.put("vnp_Version", vnp_Version);
                vnp_Params.put("vnp_Command", vnp_Command);
                vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
                vnp_Params.put("vnp_Amount", String.valueOf(totalAmountAfterDiscount.multiply(BigDecimal.valueOf(100))));
                vnp_Params.put("vnp_CurrCode", "VND");

                vnp_Params.put("vnp_BankCode", "");
                vnp_Params.put("vnp_TxnRef", codeBill);
                vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + codeBill);
                vnp_Params.put("vnp_OrderType", orderType);

                vnp_Params.put("vnp_Locale", "vn");
                vnp_Params.put("vnp_ReturnUrl", ConfigVNPay.vnp_ReturnUrl);
                vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
//            vnp_Params.put("vnp_orderData", encodedOrderDataString);

                Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
                SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
                String vnp_CreateDate = formatter.format(cld.getTime());
                vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

                cld.add(Calendar.MINUTE, 15);
                String vnp_ExpireDate = formatter.format(cld.getTime());
                vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

                List fieldNames = new ArrayList(vnp_Params.keySet());
                Collections.sort(fieldNames);
                StringBuilder hashData = new StringBuilder();
                StringBuilder query = new StringBuilder();
                Iterator itr = fieldNames.iterator();
                while (itr.hasNext()) {
                    String fieldName = (String) itr.next();
                    String fieldValue = (String) vnp_Params.get(fieldName);
                    if ((fieldValue != null) && (fieldValue.length() > 0)) {
                        //Build hash data
                        hashData.append(fieldName);
                        hashData.append('=');
                        hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                        //Build query
                        query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                        query.append('=');
                        query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                        if (itr.hasNext()) {
                            query.append('&');
                            hashData.append('&');
                        }
                    }
                }
                String queryUrl = query.toString();
                String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hashData.toString());
                System.out.println("vnp_SecureHash");
                System.out.println(vnp_SecureHash);
                queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
                String paymentUrlVNPAY = ConfigVNPay.vnp_PayUrl + "?" + queryUrl;

                Map<String, String> jsonResponse = new HashMap<>();
                jsonResponse.put("redirect", paymentUrlVNPAY);

                Gson gson = new Gson();
                String json = gson.toJson(jsonResponse);
                return ResponseEntity.ok(json);


            }else if (namePayment.equals("MoMo")){
                olBillUntility.scheduleBillDeletion(billData.getId());


                String orderInfo = "Thanh toán cho đơn hàng ";
                String redirectUrl = "http://localhost:8080/api/ol/payment-momo/success";
                String ipnUrl = "http://localhost:8080/api/ol/payment-momo/success";
                Environment environment = Environment.selectEnv("dev");
                try {
                    PaymentResponse captureWalletMoMoResponse = CreateOrderMoMo.process(environment, codeBill, codeBill, (String.valueOf(totalAmountAfterDiscount)), orderInfo, redirectUrl, ipnUrl, "", RequestType.CAPTURE_WALLET, Boolean.TRUE);
                    Map<String, String> jsonResponse = new HashMap<>();
                    jsonResponse.put("redirect", captureWalletMoMoResponse.getPayUrl());
                    Gson gson = new Gson();
                    String json = gson.toJson(jsonResponse);
                    return ResponseEntity.ok(json);
                } catch (Exception e) {
                    // Xử lý lỗi nếu có
                    return ResponseEntity.ok(0);

                }
            }
//            else if (namePayment.equals("PayPal")){
//
//            System.out.println(codeBill);
//
//            try {
//                BigDecimal exchangeRate = getExchangeRate(); // Tỷ giá USD/VND
//
//                BigDecimal totalAmountUSD = totalAmountAfterDiscount.divide(exchangeRate, 2, RoundingMode.HALF_UP);
//                Double price = Double.valueOf(String.valueOf(totalAmountUSD));
//
//                Payment payment = paypalService.createPayment(price, "USD", "PayPal",
//                        "sale", describe, "http://localhost:8080/api/ol/payment-paypal/cancel",
//                        codeBill , "http://localhost:8080/api/ol/payment-paypal/success");
//                payment.setId(codeBill);
//                System.out.println(codeBill);
//                for(Links link:payment.getLinks()) {
//                    if(link.getRel().equals("approval_url")) {
//                        Map<String, String> jsonResponse = new HashMap<>();
//                        jsonResponse.put("rederect", link.getHref());
//                        String orderId2 = jsonResponse.get("id");
//                        System.out.println(orderId2);
//                        Gson gson = new Gson();
//                        String json = gson.toJson(jsonResponse);
//
//                        return ResponseEntity.ok(json);
//                    }
//                }
//
//            } catch (PayPalRESTException e) {
//
//                e.printStackTrace();
//            }
//
//        }
            else if (namePayment.equals("COD")){
                billData.setStatus(1);
                olBillService.save(billData);

                if (billData.getCustomerEntity() != null){
                    Cart cart = olCartService.findByCustomerId(billData.getCustomerEntity().getId());

                    if (cart != null) {
                        olCartDetailService.deleteAllByCart_Id(cart.getId());
                    }
                }else {
                    checkOutBill = true;
                }
                Map<String, String> jsonResponse = new HashMap<>();
                jsonResponse.put("redirect", com.example.demo.config.Config.fe_liveServer_Success);
                Gson gson = new Gson();
                String json = gson.toJson(jsonResponse);
                return ResponseEntity.ok(json);
            }

        } else if(body instanceof Integer){
            int intValue = (int) body;
            if (intValue == 2) {
                return ResponseEntity.ok(2);
            } else if(intValue == 3){
                return ResponseEntity.ok(3);

            }else {
                return ResponseEntity.ok(0);
            }
        }


        return ResponseEntity.ok(0);


    }


    @GetMapping("bill/checkThePayper")
    public boolean checkThePayper(){
        return checkOutBill;
    }

    @PutMapping("/bill/updateCheckoutStatus")
    public void updateCheckoutStatus() {
        checkOutBill = false;

    }




// Tỷ giá USD so với VND


}
