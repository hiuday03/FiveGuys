package com.example.demo.service.onlineSales;

import com.example.demo.entity.AccountEntity;
import com.example.demo.security.Request.UserRequestDTO;

import java.util.List;
import java.util.Optional;

public interface OlAccountService {

    Optional<AccountEntity> findByAccount(String username);
//     List<UserRequestDTO> getAllAccount();
//    AccountEntity createAccount(AccountEntity accountEntity);

}
