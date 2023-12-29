package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlAddressService;
import com.example.demo.service.onlineSales.OlFavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class OlFavoritesRestController {

    @Autowired
    private OlFavoritesService olFavoritesService;

    @Autowired
    private UserService userService;


    @GetMapping("/favorites")
    public List<FavoriteEntity> listFavorites(@RequestParam("username") String username) {
        return olFavoritesService.getFavoriteListByUsername(username);
    }

    // Trong controller của bạn
    @DeleteMapping("/favorites/{id}")
    public void deleteAddressById(@PathVariable Long id) {
        // Gọi service để xóa địa chỉ với ID tương ứng
        olFavoritesService.deleteFavorite(id);
    }


    @PostMapping("/addFavorites")
    public boolean addAddress(@RequestBody FavoriteEntity addressRequest) {
        return olFavoritesService.addFavorite(addressRequest);
    }


}
