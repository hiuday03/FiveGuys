package com.example.demo.service;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Vouchers;
import com.example.demo.security.Request.UserRequestDTO;
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

    List<AccountEntity> getSStatus(Integer status);

//    Tôi viết thêm hàm này nhiệm vụ security

        Optional<AccountEntity> findByAccount2(String username);

     List<UserRequestDTO> getAllAccount2();

    AccountEntity createAccount2(AccountEntity accountEntity);

    List<AccountEntity> findByEmail(String email);





}
