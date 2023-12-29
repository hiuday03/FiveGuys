package com.example.demo.restcontroller.onlineSales.olAccountManage;

import com.example.demo.entity.AddressEntity;
import com.example.demo.security.service.impl.UserService;
import com.example.demo.service.onlineSales.OlAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class OlAddressInfoRestController {

    @Autowired
    private OlAddressService olAddressService;

    @Autowired
    private UserService userService;


    @GetMapping("/address")
    public List<AddressEntity> oladdress(@RequestParam("username") String username) {
        return olAddressService.getAddressListByUsername(username);
    }

    // Trong controller của bạn
    @DeleteMapping("/address/{id}")
    public void deleteAddressById(@PathVariable Long id) {
        // Gọi service để xóa địa chỉ với ID tương ứng
        olAddressService.deleteAddress(id);
    }

    @PostMapping("/updateAddress")
    public boolean updateUser(@RequestBody AddressEntity userInfoRequest) {
        return olAddressService.update(userInfoRequest);
    }


    @PostMapping("/addAddress")
    public boolean addAddress(@RequestBody AddressEntity addressRequest) {
        return olAddressService.addAddress(addressRequest);
    }


}
