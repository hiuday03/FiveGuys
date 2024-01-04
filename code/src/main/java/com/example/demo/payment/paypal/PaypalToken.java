//package com.example.demo.payment.paypal;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.nio.charset.StandardCharsets;
//import java.util.Base64;
//import java.util.Scanner;
//
//public class PaypalToken {
//
//    public static void main(String[] args) throws IOException {
//        String clientId = "Ac21OBQ_35WAfzShaEk3Qr9qO9SRUaHZXy03GCvOrVXJQxA221qlR9alfmzNBNlkZWsIeps7j42psH55";
//        String clientSecret = "ELe92rT390oGQJCmz8VljrIvBuU04OSyC_g4nZ9Drhr9LFV9U7KfU9-YmNFtIdAK2ZF8TanpbDEwk5q8";
//
//        String authString = clientId + ":" + clientSecret;
//        String base64Auth = Base64.getEncoder().encodeToString(authString.getBytes());
//
//        URL tokenUrl = new URL("https://api-m.sandbox.paypal.com/v1/oauth2/token");
//        HttpURLConnection tokenConn = (HttpURLConnection) tokenUrl.openConnection();
//        tokenConn.setRequestMethod("POST");
//        tokenConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//        tokenConn.setRequestProperty("Authorization", "Basic " + base64Auth);
//        tokenConn.setDoOutput(true);
//
//        String tokenRequestBody = "grant_type=client_credentials";
//        try (OutputStream os = tokenConn.getOutputStream()) {
//            byte[] input = tokenRequestBody.getBytes(StandardCharsets.UTF_8);
//            os.write(input, 0, input.length);
//        }
//
//        InputStream tokenResponseStream = tokenConn.getResponseCode() == 200
//                ? tokenConn.getInputStream()
//                : tokenConn.getErrorStream();
//
//        Scanner tokenScanner = new Scanner(tokenResponseStream).useDelimiter("\\A");
//        String tokenResponse = tokenScanner.hasNext() ? tokenScanner.next() : "";
//        System.out.println("Access Token: " + tokenResponse);
//
//        // Xây dựng yêu cầu tạo đơn hàng
//        URL orderUrl = new URL("https://api-m.sandbox.paypal.com/v2/checkout/orders");
//        HttpURLConnection orderConn = (HttpURLConnection) orderUrl.openConnection();
//        orderConn.setRequestMethod("POST");
//        orderConn.setRequestProperty("Content-Type", "application/json");
//        orderConn.setRequestProperty("Authorization", "Bearer " + tokenResponse); // Sử dụng access token vừa nhận được
//        orderConn.setDoOutput(true);
//
//        String orderRequestBody = "{ \"intent\": \"CAPTURE\", \"purchase_units\": [ { \"amount\": { \"currency_code\": \"USD\", \"value\": \"100.00\" } } ] }";
//        try (OutputStream orderOs = orderConn.getOutputStream()) {
//            byte[] orderInput = orderRequestBody.getBytes(StandardCharsets.UTF_8);
//            orderOs.write(orderInput, 0, orderInput.length);
//        }
//
//        InputStream orderResponseStream = orderConn.getResponseCode() == 201 // Kiểm tra nếu status code là 201 - Created
//                ? orderConn.getInputStream()
//                : orderConn.getErrorStream();
//
//        Scanner orderScanner = new Scanner(orderResponseStream).useDelimiter("\\A");
//        String orderResponse = orderScanner.hasNext() ? orderScanner.next() : "";
//        System.out.println("Order Response: " + orderResponse);
//    }
//
//
//}
