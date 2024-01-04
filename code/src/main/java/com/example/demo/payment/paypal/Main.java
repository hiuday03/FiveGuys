//package com.example.demo.payment.paypal;
//
//import com.paypal.base.rest.APIContext;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.AnnotationConfigApplicationContext;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.Scanner;
//
//public class Main {
//
//
//
//
//
//    public static void main(String[] args) throws IOException {
//        // Khởi tạo ApplicationContext từ PaypalConfig
//
//        // Lấy bean APIContext từ context
//
//        // Gọi API của PayPal
//        URL url = new URL("https://api-m.sandbox.paypal.com/v2/checkout/orders/PAYID-MWLC5UA9MG06370FR203072V");
//        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
//        httpConn.setRequestMethod("GET");
//
//        // Sử dụng token từ APIContext để thiết lập Authorization header
//        httpConn.setRequestProperty("Authorization", "Bearer " + "A21AAIrHvAOkGfAQwWqyP2Lng2286YmKltM3jIs7ocu7Nul4CNIISK3vlITc7_tFx5QDxBkzZI63eMY9N62K9aDpHe7gC_lDA");
//
//        // Xử lý response
//        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
//                ? httpConn.getInputStream()
//                : httpConn.getErrorStream();
//        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
//        String response = s.hasNext() ? s.next() : "";
//        System.out.println(response);
//    }
//}
