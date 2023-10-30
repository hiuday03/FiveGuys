package com.example.demo.controller.customers;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.service.serviceiplm.CustomerServiceImpl;
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
@RequestMapping("/customer")

public class CustomerController {

    private final CustomerServiceImpl customerService;

    @Autowired
    public CustomerController(CustomerServiceImpl customerService) {
        this.customerService = customerService;
    }

    @GetMapping("")
    public ResponseEntity<List<CustomerEntity>> getAllCustomer() {
        List<CustomerEntity> customers = customerService.getAllCustomer();
        return ResponseEntity.ok(customers);
    }

//    @GetMapping("/pageall")
//    public ResponseEntity<Page<CustomerEntity>> getAllCustomerPage(@RequestParam(defaultValue = "0", name = "page") Integer page) {
//        return ResponseEntity.ok(customerService.getAllCustomerPage(page));
//    }
//
//    @GetMapping("/findby/{id}")
//    public ResponseEntity<CustomerEntity> getCustomerById(@PathVariable Long id) {
//        CustomerEntity customer = customerService.getCustomerById(id);
//        if (customer != null) {
//            return ResponseEntity.ok(customer);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestBody CustomerEntity customerEntity) {
        try {
            CustomerEntity createdCustomer = customerService.createCustomer(customerEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerEntity> updateCustomer(@RequestBody CustomerEntity customerEntity, @PathVariable Long id) {
        CustomerEntity customer = customerService.updateCustomer(customerEntity, id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        try {
            customerService.deleteCustomer(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
