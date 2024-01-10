package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlBillResponse;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlBillService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlFavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol/authenticated")
public class OBillRestController {

    @Autowired
    private OlBillService olBillService;

    @Autowired
    private UserService userService;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlCustomerService olCustomerService;




    @GetMapping("/bills")
    public ResponseEntity<?> listBills(@RequestParam("username") String username) {
        Optional<AccountEntity> account = olAccountService.findByAccount(username);
        if (!account.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tài khoản không tồn tại");
        }
        Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
        if (!customerEntity.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy thông tin khách hàng");
        }
        List<Bill> bills = olBillService.findAllByCustomerEntity_IdAndStatus(customerEntity.get().getId());
        if (bills.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có hóa đơn nào được tìm thấy cho khách hàng này");
        }

        return ResponseEntity.ok(bills);
    }




//    @PutMapping("/updatePaymentStatus/{billId}")
//    public ResponseEntity<String> updatePaymentStatus(
//            @PathVariable Long billId,
//            @RequestParam(name = "paymentStatus") int paymentStatus
//    ) {
//        boolean updated = olBillService.updatePaymentStatus(billId, paymentStatus);
//        if (updated) {
//            return ResponseEntity.ok("Payment status updated successfully.");
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update payment status.");
//        }
//    }

    @GetMapping("/bills/{id}")
    public ResponseEntity<?> getBillById(@PathVariable Long id) {
        OlBillResponse bill = olBillService.findBYId(id);
        if (bill != null) {
            return ResponseEntity.ok(bill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
