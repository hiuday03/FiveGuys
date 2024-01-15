package com.example.demo.payment.momo;

import com.example.demo.config.Config;
import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Cart;
import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.onlineSales.OlBillResponse;
import com.example.demo.payment.momo.config.Environment;
import com.example.demo.payment.momo.models.QueryStatusTransactionRequest;
import com.example.demo.payment.momo.models.QueryStatusTransactionResponse;
import com.example.demo.payment.momo.processor.QueryTransactionStatus;
import com.example.demo.restcontroller.onlineSales.BillRestController;
import com.example.demo.security.AuthController;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OlBillService;
import com.example.demo.service.onlineSales.OlCartDetailService;
import com.example.demo.service.onlineSales.OlCartService;
import com.example.demo.untility.OlBillUntility;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ol")
public class MoMoPaymentController {

    @Autowired
    private BillRestController billRestController;

    @Autowired
    private AuthController authController;

    @Autowired
    private OlBillService olBillService;

    @Autowired
    private OlCartService olCartService;

    @Autowired
    private OlCartDetailService olCartDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlBillUntility olBillUntility;




    @PostMapping("/query-transaction")
    public ResponseEntity<QueryStatusTransactionResponse> queryTransactionStatus(@RequestBody QueryStatusTransactionRequest request) {
                Environment environment = Environment.selectEnv("dev");

        try {
            QueryStatusTransactionResponse response = QueryTransactionStatus.process(environment, request.getOrderId(), request.getRequestId());
            if (response != null) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }







    //Momo
    @Transactional
    @GetMapping("/payment-momo/success")
    public void handleMoMoIPN2(@RequestParam("resultCode") String code,@RequestParam("orderId") String orderId, HttpServletResponse response, HttpSession session) throws IOException {
        Bill bill = olBillService.findById(olBillUntility.decodeId(orderId));


        if(code.equals("0") ){
            if (bill.getCustomerEntity() != null){
                Cart cart = olCartService.findByCustomerId(bill.getCustomerEntity().getId());

                if (cart != null) {
                    olCartDetailService.deleteAllByCart_Id(cart.getId());
                }
            }else {
                billRestController.setCheckOutBill(true);

            }

            bill.setStatus(1);
            olBillService.save(bill);

            response.sendRedirect(Config.fe_liveServer_Success);

        }else {
            bill.setStatus(4);
            olBillUntility.restoreProductQuantity(bill.getBillDetail());
            if (bill.getVoucher() != null){
                olBillUntility.increaseVoucherQuantity(bill.getVoucher().getId());
            }
            olBillService.save(bill);
            response.sendRedirect(Config.fe_liveServer_Failed);
        }
    }


}