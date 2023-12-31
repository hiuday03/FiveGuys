package com.example.demo.restcontroller;

import com.example.demo.entity.AddressEntity;
import com.example.demo.service.serviceiplm.AddressServiceImpl;
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
@RequestMapping("/address")
public class AddressRestController {

    private final AddressServiceImpl addressService;

    @Autowired
    public AddressRestController(AddressServiceImpl addressService) {
        this.addressService = addressService;
    }

    @GetMapping("")
    public ResponseEntity<List<AddressEntity>> getAllAddress() {
        List<AddressEntity> address = addressService.getAllAddress();
        return ResponseEntity.ok(address);
    }

//    @GetMapping("/pageall")
//    public ResponseEntity<Page<AddressEntity>> getAllAddressPage(@RequestParam(defaultValue = "0", name = "page") Integer page) {
//        return ResponseEntity.ok(addressService.getAllAddressPage(page));
//    }
//
//    @GetMapping("/findby/{id}")
//    public ResponseEntity<AddressEntity> getAddressById(@PathVariable Long id) {
//        AddressEntity address = addressService.getAddressById(id);
//        if (address != null) {
//            return ResponseEntity.ok(address);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("")
    public ResponseEntity<?> createAddress(@RequestBody AddressEntity addressEntity) {
        try {
            AddressEntity createdAddress = addressService.createAddress(addressEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAddress);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressEntity> updateAddress(@RequestBody AddressEntity addressEntity, @PathVariable Long id) {
        AddressEntity address = addressService.updateAddress(addressEntity, id);
        if (address != null) {
            return ResponseEntity.ok(address);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        try {
            addressService.deleteAddress(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
