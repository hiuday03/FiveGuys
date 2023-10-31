package com.example.demo.restcontroller;


import com.example.demo.entity.AccountEntity;
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

    @PostMapping("")
    public ResponseEntity<?> createAccount(@RequestBody AccountEntity accountEntity) {
        try {
            AccountEntity createdAccount = accountService.createAccount(accountEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAccount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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
