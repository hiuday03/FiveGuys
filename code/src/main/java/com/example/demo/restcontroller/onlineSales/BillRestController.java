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
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OlBillService;
import com.example.demo.service.onlineSales.OlCartDetailService;
import com.example.demo.service.onlineSales.OlCartService;
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
import java.util.*;

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

    JsonNode billData = null;

    public JsonNode getBillData() {
        return billData;
    }
    private final PayOS payOS;

    public BillRestController(PayOS payOS) {
        super();
        this.payOS = payOS;
    }

    @Autowired
    private OlBillService olBillService;

    @Autowired
    private PaypalService paypalService;

    @Autowired
    private OlCartService olCartService;

    @Autowired
    private OlCartDetailService olCartDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    ObjectMapper mapper = new ObjectMapper();

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




    @Transactional
    @PostMapping("/bill/create")
    public ResponseEntity<?> TaoHoaDonNguoiDungChuaDangNhap(@RequestBody JsonNode orderData, HttpServletResponse  response, HttpServletRequest req, HttpSession session) throws IOException {
        Bill bill = mapper.convertValue(orderData, Bill.class);
        BigDecimal totalAmountAfterDiscount = new BigDecimal(String.valueOf(bill.getTotalAmountAfterDiscount()));
        String describe = String.valueOf(bill.getNote());
        String namePayment = bill.getPaymentMethod().getName();
        billData = orderData;

        String codeBill = String.valueOf(System.currentTimeMillis());
        session.setAttribute(codeBill,orderData);
        session.setAttribute("hello","hello");

//        JsonNode yourJsonNode = (JsonNode) session.getAttribute(codeBill);
//
//        if (yourJsonNode != null) {
//            // Sử dụng JsonNode theo nhu cầu của bạn
//            System.out.println(yourJsonNode.toString());
//        }

        // Kiểm tra và xử lý số lượng sản phẩm trước khi thanh toán
        List<BillDetail> billDetailsCheck = mapper.convertValue(orderData.get("billDetail"), new TypeReference<List<BillDetail>>() {});
        for (BillDetail detail : billDetailsCheck) {
            updateProductQuantity(detail); // Cập nhật số lượng sản phẩm cho mỗi chi tiết hóa đơn
        }

        if (namePayment.equals("QR")) {
            try {
                if (orderData == null) {
                    throw new IllegalArgumentException("orderData cannot be null");
                }
                final String description = "Thanh toán đơn hàng";
                final String returnUrl = "http://localhost:8080/api/ol/payment-payos/success";
                final String cancelUrl = "http://localhost:8080/api/ol/payment-payos/cancel";

                List<ItemData> itemList = new ArrayList<>();
                JsonNode billDetailNode = orderData.get("billDetail");

                if (billDetailNode != null && billDetailNode.isArray()) {
                    TypeReference<List<BillDetail>> type = new TypeReference<>() {
                    };
                    List<BillDetail> billDetails = mapper.convertValue(billDetailNode, type);

                    for (BillDetail billDetail : billDetails) {
                        String productName = "Hello";
                        int quantity = billDetail.getQuantity();
                        int price = Integer.valueOf(String.valueOf(billDetail.getPrice()));

                        ItemData item = new ItemData(productName, quantity, price);
                        itemList.add(item);
                    }
                }
                int orderCode = Integer.parseInt(codeBill);
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
        } else if (namePayment.equals("VNPAY")) {

            String vnp_Version = "2.1.0";
            String vnp_Command = "pay";
            String orderType = "other";

            String vnp_TxnRef = codeBill;
            System.out.println(codeBill);
            String vnp_IpAddr = ConfigVNPay.getIpAddress(req);

            String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;

            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", vnp_Version);
            vnp_Params.put("vnp_Command", vnp_Command);
            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf(totalAmountAfterDiscount.multiply(BigDecimal.valueOf(100))));
            vnp_Params.put("vnp_CurrCode", "VND");

            vnp_Params.put("vnp_BankCode", "");
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
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

            System.out.println(vnp_SecureHash);
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrlVNPAY = ConfigVNPay.vnp_PayUrl + "?" + queryUrl;

            Map<String, String> jsonResponse = new HashMap<>();
            jsonResponse.put("rederect", paymentUrlVNPAY);

            Gson gson = new Gson();
            String json = gson.toJson(jsonResponse);

//            System.out.println(paymentUrlVNPAY);

            return ResponseEntity.ok(json);


        }else if (namePayment.equals("MoMo")){
            String requestId = String.valueOf(System.currentTimeMillis());
            String orderId = String.valueOf(System.currentTimeMillis());

            String orderInfo = "Thanh toán cho đơn hàng ";
            String redirectUrl = "http://localhost:8080/api/ol/payment-momo/success";
            String ipnUrl = "http://localhost:8080/api/ol/payment-momo/success";
            Environment environment = Environment.selectEnv("dev");
            try {
                PaymentResponse captureWalletMoMoResponse = CreateOrderMoMo.process(environment, orderId, requestId, (String.valueOf(totalAmountAfterDiscount)), orderInfo, redirectUrl, ipnUrl, "", RequestType.CAPTURE_WALLET, Boolean.TRUE);
                Map<String, String> jsonResponse = new HashMap<>();
                jsonResponse.put("rederect", captureWalletMoMoResponse.getPayUrl());
                Gson gson = new Gson();
                String json = gson.toJson(jsonResponse);
                return ResponseEntity.ok(json);
            } catch (Exception e) {
                // Xử lý lỗi nếu có
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create order: " + e.getMessage());
            }
        }else if (namePayment.equals("PayPal")){
            try {
                BigDecimal exchangeRate = getExchangeRate(); // Tỷ giá USD/VND

                BigDecimal totalAmountUSD = totalAmountAfterDiscount.divide(exchangeRate, 2, RoundingMode.HALF_UP);
                Double price = Double.valueOf(String.valueOf(totalAmountUSD));

                Payment payment = paypalService.createPayment(price, "USD", "PayPal",
                        "sale", describe, "http://localhost:8080/api/ol/payment-paypal/cancel",
                        "http://localhost:8080/api/ol/payment-paypal/success");
                payment.setId(codeBill);
                for(Links link:payment.getLinks()) {
                    if(link.getRel().equals("approval_url")) {
                        Map<String, String> jsonResponse = new HashMap<>();
                        jsonResponse.put("rederect", link.getHref());
                        Gson gson = new Gson();
                        String json = gson.toJson(jsonResponse);
                        return ResponseEntity.ok(json);
                    }
                }

            } catch (PayPalRESTException e) {

                e.printStackTrace();
            }

        }else if (namePayment.equals("COD")){
            olBillService.TaoHoaDonNguoiDungChuaDangNhap(orderData);
            if (bill.getCustomerEntity() != null){
                Cart cart = olCartService.findByCustomerId(bill.getCustomerEntity().getId());

                if (cart != null) {
                    olCartDetailService.deleteAllByCart_Id(cart.getId());
                }
            }else {
                checkOutBill = true;
            }
            Map<String, String> jsonResponse = new HashMap<>();
            jsonResponse.put("rederect", com.example.demo.config.Config.fe_liveServer_Success);
            Gson gson = new Gson();
            String json = gson.toJson(jsonResponse);
            return ResponseEntity.ok(json);
        }
        return null;

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
    private final String EXCHANGE_RATE_API = "https://openexchangerates.org/api/latest.json?base=USD&symbols=VND&app_id=8bbe0880013e4460b9b81960a33980ed";

    public BigDecimal getExchangeRate() {
        RestTemplate restTemplate = new RestTemplate();
        JsonNode response = restTemplate.getForObject(EXCHANGE_RATE_API, JsonNode.class);

        // Lấy tỷ giá từ JSON response
        JsonNode rates = response.get("rates");
        BigDecimal exchangeRate = rates.get("VND").decimalValue();

        return exchangeRate;
    }

}
