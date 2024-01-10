package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.entity.FavoriteEntity;
import com.example.demo.entity.RatingEntity;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.model.response.onlineSales.OlRatingResponse;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol/authenticated")
public class OlRatingRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private OlRatingService olRatingService;


    @GetMapping("/rates")
    public List<RatingEntity> listRates(@RequestParam("username") String username) {
        return olRatingService.getRatingListByUsername(username);
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


    @GetMapping("/listRate/{productId}")
    public ResponseEntity<?> getRatingsByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(olRatingService.findByProductId(productId));
    }

}
