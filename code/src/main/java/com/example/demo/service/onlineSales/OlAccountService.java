package com.example.demo.service.onlineSales;

import com.example.demo.entity.AccountEntity;

import java.util.Optional;

public interface OlAccountService {

    Optional<AccountEntity> findByAccount(String username);

}
