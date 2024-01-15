package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlFavoritesAddResponse;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlAddressService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlFavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol/authenticated")
public class OlFavoritesRestController {

    @Autowired
    private OlFavoritesService olFavoritesService;

    @Autowired
    private UserService userService;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlCustomerService olCustomerService;


//    @GetMapping("/favorites")
//    public List<OlFavoritesResponse> listFavorites(@RequestParam("username") String username) {
//        return olFavoritesService.getFavoriteListByUsername(username);
//    }



    @GetMapping("/favorites")
    public ResponseEntity<?> listRates(@RequestParam("username") String username,
                                       @RequestParam("page") int page) {
//
//        return olRatingService.findAllByCustomer_IdOrderByYourFieldDesc(username);

        Optional<AccountEntity> account = olAccountService.findByAccount(username);
        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customerEntity.isPresent()) {
                int size = 8;
                Page<OlFavoritesResponse> ratingEntities = olFavoritesService.findAllByCustomer(customerEntity.get().getId(), page, size);
                if (ratingEntities.isEmpty()) {
                    return ResponseEntity.ok("Không có hóa đơn nào được tìm thấy cho khách hàng này");
                }
                return ResponseEntity.ok(ratingEntities);
            }
        }

        return ResponseEntity.notFound().build();
    }





    // Trong controller của bạn
    @DeleteMapping("/favorites/{id}")
    public void deleteAddressById(@PathVariable Long id) {
        // Gọi service để xóa địa chỉ với ID tương ứng
        olFavoritesService.deleteFavorite(id);
    }


    @PostMapping("/addFavorites")
    public ResponseEntity<Integer> addAddress(@RequestBody OlFavoritesAddResponse addressRequest) {
        Integer result = olFavoritesService.addFavorite(addressRequest);
        return ResponseEntity.ok(result);
    }



}
