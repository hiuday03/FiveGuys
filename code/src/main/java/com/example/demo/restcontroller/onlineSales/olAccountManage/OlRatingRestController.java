package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.model.response.onlineSales.OlRatingResponse;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol/authenticated")
public class OlRatingRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private OlRatingService olRatingService;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlCustomerService olCustomerService;


    @GetMapping("/rates")
    public ResponseEntity<?> listRates(@RequestParam("username") String username,
                                        @RequestParam("page") int page) {
//
//        return olRatingService.findAllByCustomer_IdOrderByYourFieldDesc(username);

        Optional<AccountEntity> account = olAccountService.findByAccount(username);
        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customerEntity.isPresent()) {
                int size = 6;
                Page<RatingEntity> ratingEntities = olRatingService.findAllByCustomer_IdOrderByYourFieldDesc(customerEntity.get().getId(), page, size);
                if (ratingEntities.isEmpty()) {
                    return ResponseEntity.ok("Không có hóa đơn nào được tìm thấy cho khách hàng này");
                }
                return ResponseEntity.ok(ratingEntities);
            }
        }

        return ResponseEntity.notFound().build();
    }

    // Trong controller của bạn
    @DeleteMapping("/deleteRate/{id}")
    public void deleteRateById(@PathVariable Long id) {
        // Gọi service để xóa địa chỉ với ID tương ứng
        olRatingService.deleteRating(id);
    }


    @PostMapping("/addRate")
    public boolean addRate(@RequestBody OlRatingResponse ratingEntity) {

        return olRatingService.addRating(ratingEntity);
    }


    @GetMapping("/listRate")
    public ResponseEntity<?> getRatingsByProductId(@RequestParam("productId") Long productId,
                                                   @RequestParam("page") int page) {
        int size = 6;
        return ResponseEntity.ok(olRatingService.findByProductId(productId,page,size));
    }

}
