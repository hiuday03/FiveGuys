package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.service.onlineSales.OlAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OlAccountServiceImpl implements OlAccountService {

    @Autowired
    private OlAccountRepository accountRepository;

    public  UserRequestDTO mapAccountToUserRequestDTO(AccountEntity account) {
        UserRequestDTO userRequestDTO = new UserRequestDTO();
        userRequestDTO.setAccount(account.getAccount());
        userRequestDTO.setEmail(account.getEmail());
        userRequestDTO.setId(account.getId());
        userRequestDTO.setActive(account.isActive());
        userRequestDTO.setOtp(account.getConfirmationCode());
        // Các trường thông tin khác
        return userRequestDTO;
    }

    @Override
    public Optional<AccountEntity> findByAccount(String username) {
        Optional<AccountEntity> account = accountRepository.findByAccount(username);
        if (account.isPresent()){
           return account;
        }
        return Optional.empty();
    }

    @Override
    public List<UserRequestDTO> getAllAccount() {
        List<AccountEntity> accounts = accountRepository.findAll();
        List<UserRequestDTO> userRequestDTOs = new ArrayList<>();
        for (AccountEntity account : accounts) {
            userRequestDTOs.add(mapAccountToUserRequestDTO(account));
        }
        return userRequestDTOs;
    }

    @Override
    public AccountEntity createAccount(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }


}
