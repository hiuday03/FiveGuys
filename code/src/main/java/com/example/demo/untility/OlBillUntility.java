package com.example.demo.untility;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.payment.momo.config.Environment;
import com.example.demo.payment.momo.models.QueryStatusTransactionResponse;
import com.example.demo.payment.momo.processor.QueryTransactionStatus;
import com.example.demo.payment.vnpay.config.ConfigVNPay;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OlBillDetailService;
import com.example.demo.service.onlineSales.OlBillService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class OlBillUntility {


    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlBillService olBillService;

    @Autowired
    private OlBillDetailService billDetailService;


    public boolean authenticationCheckMoMo(String orderId) {
        try {
            Environment environment = Environment.selectEnv("dev");
            QueryStatusTransactionResponse response = QueryTransactionStatus.process(environment, orderId, orderId);
            if (response != null) {
                System.out.println(response.getResultCode());
                return response.getResultCode() == 0;
            }
        } catch (Exception e) {
            e.printStackTrace(); // Xử lý lỗi nếu cần
        }
        return false;
    }


    public boolean authenticationCheckVnPay(String orderId) throws Exception {
        try {
            HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String vnp_RequestId = ConfigVNPay.getRandomNumber(8);
            String vnp_Version = "2.1.0";
            String vnp_Command = "querydr";
            String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;
            String vnp_TxnRef = orderId;
            String vnp_OrderInfo = "Kiem tra ket qua GD OrderId:" + vnp_TxnRef;
//        String vnp_TransDate = transDate;

            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());

            String vnp_IpAddr = ConfigVNPay.getIpAddress(req); // Modify this based on your implementation in Config

            JsonObject vnp_Params = new JsonObject();

            vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
            vnp_Params.addProperty("vnp_Version", vnp_Version);
            vnp_Params.addProperty("vnp_Command", vnp_Command);
            vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
            String vnp_TransDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
            vnp_Params.addProperty("vnp_TransactionDate", vnp_TransDate);
            vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
            vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

            String hash_Data= String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode, vnp_TxnRef, vnp_TransDate, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);
            String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hash_Data.toString());

            vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

            URL url = new URL(ConfigVNPay.vnp_ApiUrl);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "Application/json");
            con.setDoOutput(true);
            String postData = vnp_Params.toString();
            con.setRequestProperty("Content-Length", String.valueOf(postData.length()));

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postData);
            wr.flush();
            wr.close();

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> requestEntity = new HttpEntity<>(vnp_Params.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(ConfigVNPay.vnp_ApiUrl, requestEntity, String.class);
            String responseBody = response.getBody();

            JsonObject jsonObject = new Gson().fromJson(responseBody, JsonObject.class);

            String transactionStatus = jsonObject.get("vnp_TransactionStatus").getAsString();

            System.out.println("vnp_TransactionStatus: " + transactionStatus);
            boolean isTransactionSuccessful = "00".equals(transactionStatus);

            return isTransactionSuccessful;
        } catch (Exception e) {
            e.printStackTrace(); // Xử lý lỗi nếu cần
        }
        return false;
    }

    public  long decodeId(String encodedId) {
        byte[] decodedBytes = Base64.getDecoder().decode(encodedId);
        String decodedString = new String(decodedBytes);
        return Long.parseLong(decodedString);
    }

    public void restoreProductQuantity(List<BillDetail> billDetails) {
        for (BillDetail detail : billDetails) {
            Optional<ProductDetail> productDetail = olProductDetailService.findById(detail.getProductDetail().getId());
            if (productDetail.isPresent()){
                int quantityToAdd = detail.getQuantity();
                int currentQuantity = productDetail.get().getQuantity();
                productDetail.get().setQuantity(currentQuantity + quantityToAdd);
                olProductDetailService.save(productDetail.get());
            }
        }
    }

    public static String encodeId(long id) {
        byte[] bytes = String.valueOf(id).getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }




    private final Timer timer = new Timer();

    public void scheduleBillDeletion(Long Id) {
        TimerTask task = new TimerTask() {
            @SneakyThrows
            @Override
            public void run() {
                Bill bill = olBillService.findById(Id);
                int initialStatus = bill.getStatus(); // Lưu trạng thái ban đầu

                if (initialStatus == 10) {
                    // Nếu trạng thái không bị thay đổi
                    if (initialStatus == bill.getStatus()) {
                        if (bill.getPaymentMethod().getName().equals("MoMo")) {
                            if (authenticationCheckMoMo(encodeId(bill.getId()))) {
                                bill.setStatus(1);
                                olBillService.save(bill);
                                return;
                            }
                        } else if (bill.getPaymentMethod().getName().equals("VNPAY")) {
                            if (authenticationCheckVnPay(encodeId(bill.getId()))) {
                                bill.setStatus(1);
                                olBillService.save(bill);
                                return;
                            }
                        }
                        restoreProductQuantity(billDetailService.findByBill_IdAndStatus(bill.getId()));
                        bill.setStatus(4);
                        olBillService.save(bill);
                    }
                }
            }
        };
        timer.schedule(task, 50000); // 60000 milliseconds = 1 minute
    }



}