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

    ObjectMapper mapper = new ObjectMapper();



    @PostMapping("/query-transaction")
    public ResponseEntity<QueryStatusTransactionResponse> queryTransactionStatus(@RequestBody QueryStatusTransactionRequest request) {
                Environment environment = Environment.selectEnv("dev");

        try {
            QueryStatusTransactionResponse response = QueryTransactionStatus.process(environment, request.getOrderId(), request.getRequestId());
            if (response != null) {
                System.out.println(response.getResultCode());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @PostMapping("/payment-momo/confirm-transaction")
//    public ResponseEntity<String> confirmTransaction() {
//        String requestId = "1704179397755";
//        String orderId = "1704179397755";
//        long amount = 280000;
//
//        Environment environment = Environment.selectEnv("dev");
//
//        try {
//            ConfirmResponse confirmResponse = ConfirmTransaction.process(environment, orderId, requestId, Long.toString(amount), ConfirmRequestType.CAPTURE, "");
//
//            // Xử lý và trả về kết quả, ví dụ: trả về thông tin xác nhận giao dịch
//            return ResponseEntity.ok("Transaction confirmed successfully.");
//        } catch (Exception e) {
//            // Xử lý lỗi nếu có
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to confirm transaction: " + e.getMessage());
//        }
//    }

    private void restoreProductQuantity(List<BillDetail> billDetails) {
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

    //Momo
    @Transactional
    @GetMapping("/payment-momo/success")
    public void handleMoMoIPN2(@RequestParam("resultCode") String code,@RequestParam("orderId") String orderId, HttpServletResponse response, HttpSession session) throws IOException {
        OlBillResponse bill = olBillService.findBYId(Long.valueOf(orderId));


        if(code.equals("0") ){



            if (bill.getCustomerEntity() != null){
                Cart cart = olCartService.findByCustomerId(bill.getCustomerEntity().getId());

                if (cart != null) {
                    olCartDetailService.deleteAllByCart_Id(cart.getId());
                }
            }else {
                billRestController.setCheckOutBill(true);

            }
            response.sendRedirect(Config.fe_liveServer_Success);

        }else {
            List<BillDetail> billDetailsCheck = bill.getBillDetail();

            restoreProductQuantity(billDetailsCheck);
            response.sendRedirect(Config.fe_liveServer_Failed);
        }
        System.out.println(code);
    }


}