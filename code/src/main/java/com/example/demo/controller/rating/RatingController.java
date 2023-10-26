package com.example.demo.controller.rating;

import com.example.demo.entity.RatingEntity;
import com.example.demo.service.serviceiplm.RatingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/rating")

public class RatingController {

    private final RatingServiceImpl ratingService;

    @Autowired
    public RatingController(RatingServiceImpl ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("")
    public ResponseEntity<List<RatingEntity>> getAllRating() {
        List<RatingEntity> rating = ratingService.getAllRating();
        return ResponseEntity.ok(rating);
    }

//    @GetMapping("/pageall")
//    public ResponseEntity<Page<RatingEntity>> getAllRatingPage(@RequestParam(defaultValue = "0", name = "page") Integer page) {
//        return ResponseEntity.ok(ratingService.getAllRatingPage(page));
//    }
//
//    @GetMapping("/findby/{ratingId}")
//    public ResponseEntity<RatingEntity> getRatingById(@PathVariable Long id) {
//        RatingEntity rating = ratingService.getRatingById(id);
//        if (rating != null) {
//            return ResponseEntity.ok(rating);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("")
    public ResponseEntity<?> createRating(@RequestBody RatingEntity ratingEntity) {
        try {
            RatingEntity createdRating = ratingService.createRating(ratingEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRating);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<RatingEntity> updateRating(@RequestBody RatingEntity ratingEntity, @PathVariable Long id) {
        RatingEntity rating = ratingService.updateRating(ratingEntity, id);
        if (rating != null) {
            return ResponseEntity.ok(rating);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        try {
            ratingService.deleteRating(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
