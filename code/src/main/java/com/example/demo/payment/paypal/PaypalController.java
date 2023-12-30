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
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.paypal.api.payments.Links;
 import com.paypal.api.payments.Payment;
 import com.paypal.base.rest.PayPalRESTException;

import java.io.IOException;
import java.util.List;

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


}