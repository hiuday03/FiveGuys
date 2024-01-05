//package com.example.demo.payment.payos.controller;
//
//import com.example.demo.config.Config;
//import com.example.demo.entity.Bill;
//import com.example.demo.entity.Cart;
//import com.example.demo.payment.momo.models.PaymentResponse;
//import com.example.demo.restcontroller.onlineSales.BillRestController;
//import com.example.demo.service.onlineSales.OlBillService;
//import com.example.demo.service.onlineSales.OlCartDetailService;
//import com.example.demo.service.onlineSales.OlCartService;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.lib.payos.PayOS;
//import com.lib.payos.type.ItemData;
//import com.lib.payos.type.PaymentData;
//
//import java.io.IOException;
//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.List;
//
//import jakarta.servlet.http.HttpSession;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import jakarta.servlet.http.HttpServletResponse;
//import java.util.Date;
//@RestController
//@CrossOrigin("*")
//@RequestMapping("/api/ol")
//
//public class CheckoutController {
//
//    @Autowired
//    private BillRestController billRestController;
//
//    @Autowired
//    private OlCartService olCartService;
//
//    @Autowired
//    private OlCartDetailService olCartDetailService;
//
//    ObjectMapper mapper = new ObjectMapper();
//
////  private final PayOS payOS;
////  public CheckoutController(PayOS payOS) {
////    super();
////    this.payOS = payOS;
////  }
//
//    @Autowired
//    private OlBillService olBillService;
//
////    @RequestMapping(value = "/payment/payos")
////    public String Index() {
////        return "payment/payos/index";
////    }
//    //PayOs
//@Transactional
//@RequestMapping(value = "/payment-payos/success")
//    public void Success(@RequestParam("code") String code,
//                          @RequestParam("id") String id,
//                          @RequestParam("cancel") boolean isCancelled,
//                          @RequestParam("status") String status
//                       , HttpServletResponse response
//                         ) throws IOException {
//      if(code.equals("00") && status.equals("PAID ")){
//          olBillService.TaoHoaDonNguoiDungChuaDangNhap(billRestController.getBillData());
//
//          Bill bill = mapper.convertValue(billRestController.getBillData(), Bill.class);
//
//          if (bill.getCustomerEntity() != null){
//              Cart cart = olCartService.findByCustomerId(bill.getCustomerEntity().getId());
//
//              if (cart != null) {
//                  olCartDetailService.deleteAllByCart_Id(cart.getId());
//              }
//          }else {
//              billRestController.setCheckOutBill(true);
//
//          }
//
//          response.sendRedirect(Config.fe_liveServer_Success);
//
//      }
//
////        return "payment/payos/success";
//    }
//    @RequestMapping(value = "/payment-payos/cancel")
//    public void Cancel( HttpServletResponse response) throws IOException {
//        response.sendRedirect(Config.fe_liveServer_Failed);
//
//    }
//
//
//
//
//
//
//}
//
