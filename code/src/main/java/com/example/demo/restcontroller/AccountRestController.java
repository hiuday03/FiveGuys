package com.example.demo.restcontroller;


import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CheckRequest;
import com.example.demo.repository.AccountRepository;
import com.example.demo.service.serviceiplm.AccountServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/account")

public class AccountRestController {

    @Autowired
    private AccountRepository accountRepository;

    private final AccountServiceImpl accountService;

    @Autowired
    public AccountRestController(AccountServiceImpl accountService) {
        this.accountService = accountService;
    }

    @GetMapping("")
    public ResponseEntity<List<AccountEntity>> getAllAccount() {
        List<AccountEntity> account = accountService.getAllAccount();
        return ResponseEntity.ok(account);
    }
    @GetMapping("/timkiem-status/{st}")
    public ResponseEntity<?> getSStatus(@PathVariable Integer st){
        return ResponseEntity.ok(accountService.getSStatus(st));
    }
    @GetMapping("/not-in-customer-employee")
    public List<AccountEntity> loadAccount() {
        return accountService.loadAccount();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody AccountEntity accountEntity) {
        try {
            AccountEntity save = accountService.save(accountEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(save);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("/check-email")
//    public ResponseEntity<Object> checkEmailExists(@RequestBody CheckRequest checkRequest) {
//        boolean exists = accountRepository.existsByEmail(checkRequest.getEmail());
//        return ResponseEntity.ok().body(exists);
//    }

//    @PostMapping("/check-account")
//    public ResponseEntity<Object> checkAccountExists(@RequestBody CheckRequest checkRequest) {
//        boolean exists = accountRepository.existsByAccount(checkRequest.getAccount());
//        return ResponseEntity.ok().body(exists);
//    }
//
//    @PostMapping("/check-phone-number")
//    public ResponseEntity<Object> checkPhoneNumberExists(@RequestBody CheckRequest checkRequest) {
//        boolean exists = accountRepository.existsByPhoneNumber(checkRequest.getPhoneNumber());
//        return ResponseEntity.ok().body(exists);
//    }

    @PostMapping("")
    public ResponseEntity<AccountEntity> createAccount(@RequestBody AccountEntity accountEntity) {
        AccountEntity createdAccount = accountService.createAccount(accountEntity);

        if (createdAccount != null) {
            return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountEntity> updateAccount(@RequestBody AccountEntity accountEntity, @PathVariable Long id) {
        AccountEntity account = accountService.updateAccount(accountEntity, id);
        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
