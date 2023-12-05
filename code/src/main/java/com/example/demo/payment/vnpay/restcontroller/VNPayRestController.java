package com.example.demo.payment.vnpay.restcontroller;

import com.example.demo.payment.vnpay.DTO.PaymentRestDTO;
//import com.google.gson.Gson;
//import com.google.gson.JsonObject;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.websocket.server.PathParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.payment.vnpay.config.Config;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5501")
@RequestMapping("/api/payment")
public class VNPayRestController {


    @GetMapping("/pay-bill")
    public ResponseEntity<?> getPay( HttpServletRequest req) throws UnsupportedEncodingException{

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = 100000*100;

        String vnp_TxnRef = Config.getRandomNumber(8);
        String vnp_IpAddr = Config.getIpAddress(req);

        String vnp_TmnCode = Config.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_BankCode", "");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl",Config.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

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
        String vnp_SecureHash = Config.hmacSHA512(Config.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrlVNPAY = Config.vnp_PayUrl + "?" + queryUrl;

        Map<String, String> jsonResponse = new HashMap<>();
        jsonResponse.put("rederect", paymentUrlVNPAY);

        Gson gson = new Gson();
        String json = gson.toJson(jsonResponse);

        System.out.println(paymentUrlVNPAY);

        return ResponseEntity.ok(json);
    }

    @GetMapping("/payment-callback")
    public void paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response) throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
//        String contractId = queryParams.get("contractId");
//        String registerServiceId = queryParams.get("registerServiceId");
//        String billId = queryParams.get("billId");
//        if(contractId!= null && !contractId.equals("")) {
            if ("00".equals(vnp_ResponseCode)) {
                // Giao dịch thành công
                // Thực hiện các xử lý cần thiết, ví dụ: cập nhật CSDL
//                Contract contract = contractRepository.findById(Integer.parseInt(queryParams.get("contractId")))
//                        .orElseThrow(() -> new NotFoundException("Không tồn tại hợp đồng này của sinh viên"));
//                contract.setStatus(1);
//                contractRepository.save(contract);
                response.sendRedirect("http://127.0.0.1:5501/index.html#!/paymentSuccess");

                System.out.println("Giao dịch thành công");
            } else {
                // Giao dịch thất bại
                // Thực hiện các xử lý cần thiết, ví dụ: không cập nhật CSDL\
                response.sendRedirect("http://127.0.0.1:5501/index.html#!/paymentFailed");
                System.out.println("Giao dịch thất bại");

            }
//        }
//        if(registerServiceId!= null && !registerServiceId.equals("")) {
//            if ("00".equals(vnp_ResponseCode)) {
//                // Giao dịch thành công
//                // Thực hiện các xử lý cần thiết, ví dụ: cập nhật CSDL
//                RegisterServices registerServices = registerServicesRepository.findById(Integer.parseInt(queryParams.get("registerServiceId")))
//                        .orElseThrow(() -> new NotFoundException("Không tồn tại dịch vụ này của sinh viên"));
//                registerServices.setStatus(1);
//                registerServicesRepository.save(registerServices);
//                response.sendRedirect("http://localhost:4200/info-student");
//            } else {
//                // Giao dịch thất bại
//                // Thực hiện các xử lý cần thiết, ví dụ: không cập nhật CSDL\
//                response.sendRedirect("http://localhost:4200/payment-failed");
//
//            }
//        }
//        if(billId!= null && !billId.equals("")) {
//            if ("00".equals(vnp_ResponseCode)) {
//                // Giao dịch thành công
//                // Thực hiện các xử lý cần thiết, ví dụ: cập nhật CSDL
//                Bill bill = billRepository.findById(Integer.parseInt(queryParams.get("billId")))
//                        .orElseThrow(() -> new NotFoundException("Không tồn tại hóa đơn điện nước này"));
//                bill.setStatus(true);
//                billRepository.save(bill);
//                response.sendRedirect("http://localhost:4200/info-student");
//            } else {
//                // Giao dịch thất bại
//                // Thực hiện các xử lý cần thiết, ví dụ: không cập nhật CSDL\
//                response.sendRedirect("http://localhost:4200/payment-failed");
//
//            }
//        }


    }
}
