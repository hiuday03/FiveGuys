package com.example.demo.restcontroller.offlineSales;

import com.example.demo.entity.AddressEntity;
import com.example.demo.service.offlineSales.OfAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/of-address")
public class OfAddressController {
    @Autowired
    private OfAddressService service;

    @RequestMapping("{id}")
    public ResponseEntity<AddressEntity> getAllByCustomerId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findByCustomerId(id));
    }
}
