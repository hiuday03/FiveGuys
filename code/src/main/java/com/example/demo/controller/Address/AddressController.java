package com.example.demo.controller.Customers;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.service.serviceiplm.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("/customers")

public class CustomerController {

    private final CustomerServiceImpl customerService;

    @Autowired
    public CustomerController(CustomerServiceImpl customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerEntity>> getAllCustomers() {
        List<CustomerEntity> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    @GetMapping
    public ResponseEntity<Page<CustomerEntity>> getAllCustomersPage(@RequestParam(defaultValue = "0", name = "page") Integer page) {
        return ResponseEntity.ok(customerService.getAllCustomersPage(page));
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<CustomerEntity> getCustomerById(@PathVariable Long customerId) {
        CustomerEntity customer = customerService.getCustomerById(customerId);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody CustomerEntity customerEntity) {
        try {
            CustomerEntity createdCustomer = customerService.createCustomer(customerEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{customerId}")
    public ResponseEntity<CustomerEntity> updateCustomer(@RequestBody CustomerEntity customerEntity, @PathVariable Long customerId) {
        CustomerEntity customer = customerService.updateCustomer(customerEntity, customerId);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{customerId}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long customerId) {
        try {
            customerService.deleteCustomer(customerId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
