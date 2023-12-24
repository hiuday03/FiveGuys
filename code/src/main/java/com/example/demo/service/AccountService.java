package com.example.demo.service;

import com.example.demo.entity.AccountEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface AccountService {
    List<AccountEntity> getAllAccount();

    List<AccountEntity> loadAccount();

    AccountEntity getAccountById(Long id);

    Optional<AccountEntity> findByAccount(String account);

    Page<AccountEntity> getAllAccountPage(Integer page);

    AccountEntity createAccount(AccountEntity accountEntity);

    AccountEntity save(AccountEntity accountEntity);

    AccountEntity updateAccount(AccountEntity accountEntity, Long id);

    void deleteAccount(Long id);

    List<AccountEntity> getAll();

}
