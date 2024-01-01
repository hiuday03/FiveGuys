package com.example.demo.payment.momo;

import com.example.demo.config.Config;
import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Cart;
import com.example.demo.entity.ProductDetail;
import com.example.demo.payment.momo.config.Environment;
import com.example.demo.payment.momo.enums.ConfirmRequestType;
import com.example.demo.payment.momo.enums.RequestType;
import com.example.demo.payment.momo.models.ConfirmResponse;
import com.example.demo.payment.momo.models.PaymentResponse;
import com.example.demo.payment.momo.processor.ConfirmTransaction;
import com.example.demo.payment.momo.processor.CreateOrderMoMo;
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
import org.springframework.ui.Model;
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



    @PostMapping("/payment-momo/confirm-transaction")
    public ResponseEntity<String> confirmTransaction() {
        String requestId = String.valueOf(System.currentTimeMillis());
        String orderId = String.valueOf(System.currentTimeMillis());
        long amount = 50000;

        Environment environment = Environment.selectEnv("dev");

        try {
            ConfirmResponse confirmResponse = ConfirmTransaction.process(environment, orderId, requestId, Long.toString(amount), ConfirmRequestType.CAPTURE, "");

            // Xử lý và trả về kết quả, ví dụ: trả về thông tin xác nhận giao dịch
            return ResponseEntity.ok("Transaction confirmed successfully.");
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to confirm transaction: " + e.getMessage());
        }
    }

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

                JsonNode bilData = (JsonNode) session.getAttribute(orderId);
        System.out.println("Hello");
        System.out.println(bilData);
        if(code.equals("0") && bilData != null){
            olBillService.TaoHoaDonNguoiDungChuaDangNhap(bilData);

            Bill bill = mapper.convertValue(bilData, Bill.class);

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
            List<BillDetail> billDetailsCheck = mapper.convertValue(bilData.get("billDetail"), new TypeReference<List<BillDetail>>() {});

            restoreProductQuantity(billDetailsCheck);
            response.sendRedirect(Config.fe_liveServer_Failed);
        }
        System.out.println(code);
    }


}