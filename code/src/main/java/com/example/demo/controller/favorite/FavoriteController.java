package com.example.demo.controller.favorite;

import com.example.demo.entity.FavoriteEntity;
import com.example.demo.service.serviceiplm.FavoriteServiceImpl;
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
@RequestMapping("/favorite")

public class FavoriteController {

    private final FavoriteServiceImpl favoriteService;

    @Autowired
    public FavoriteController(FavoriteServiceImpl favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("")
    public ResponseEntity<List<FavoriteEntity>> getAllFavorite() {
        List<FavoriteEntity> favorite = favoriteService.getAllFavorite();
        return ResponseEntity.ok(favorite);
    }

//    @GetMapping("/pageall")
//    public ResponseEntity<Page<FavoriteEntity>> getAllFavoritePage(@RequestParam(defaultValue = "0", name = "page") Integer page) {
//        return ResponseEntity.ok(favoriteService.getAllFavoritePage(page));
//    }
//
//    @GetMapping("/findby/{favoriteId}")
//    public ResponseEntity<FavoriteEntity> getFavoriteById(@PathVariable Long id) {
//        FavoriteEntity favorite = favoriteService.getFavoriteById(id);
//        if (favorite != null) {
//            return ResponseEntity.ok(favorite);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("")
    public ResponseEntity<?> createFavorite(@RequestBody FavoriteEntity favoriteEntity) {
        try {
            FavoriteEntity createdFavorite = favoriteService.createFavorite(favoriteEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdFavorite);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FavoriteEntity> updateFavorite(@RequestBody FavoriteEntity favoriteEntity, @PathVariable Long id) {
        FavoriteEntity favorite = favoriteService.updateFavorite(favoriteEntity, id);
        if (favorite != null) {
            return ResponseEntity.ok(favorite);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        try {
            favoriteService.deleteFavorite(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
