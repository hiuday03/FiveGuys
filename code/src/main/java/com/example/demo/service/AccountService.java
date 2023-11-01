package com.example.demo.service;

import com.example.demo.entity.AccountEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccountService {
    List<AccountEntity> getAllAccount();

    List<AccountEntity> loadAccount();

    AccountEntity getAccountById(Long id);

    Page<AccountEntity> getAllAccountPage(Integer page);

    AccountEntity createAccount(AccountEntity accountEntity);

    AccountEntity updateAccount(AccountEntity accountEntity, Long id);

    void deleteAccount(Long id);

}
