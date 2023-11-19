package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import com.example.demo.service.onlineSales.OlAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OlAccountServiceImpl implements OlAccountService {

    @Autowired
    private OlAccountRepository accountRepository;

    @Override
    public Optional<AccountEntity> findByAccount(String username) {
        Optional<AccountEntity> account = accountRepository.findByAccount(username);
        if (account.isPresent()){
            return account;
        }
        return Optional.empty();
    }



}
