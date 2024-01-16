package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.model.request.onlineSales.accountManage.UserInfoRequest;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import com.example.demo.security.Request.UserRequestDTO;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OlAccountServiceImpl implements OlAccountService {

    @Autowired
    private OlAccountRepository accountRepository;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private OlEmployeeService olEmployeeService;

//    public  UserRequestDTO mapAccountToUserRequestDTO(AccountEntity account) {
//        UserRequestDTO userRequestDTO = new UserRequestDTO();
//        userRequestDTO.setAccount(account.getAccount());
//        userRequestDTO.setEmail(account.getEmail());
//        userRequestDTO.setId(account.getId());
//        // Các trường thông tin khác
//        return userRequestDTO;
//    }

    @Override
    public Optional<AccountEntity> findByAccount(String username) {
        Optional<AccountEntity> account = accountRepository.findByAccount(username);
        if (account.isPresent()) {
            return account;
        }
        return Optional.empty();
    }

    @Override
    public boolean updateUser(UserInfoRequest userInfoRequest) {
        if (userInfoRequest.getAccount().getRole().getFullName().equals("CUSTOMER")) {
                Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(userInfoRequest.getAccount().getId()));
                CustomerEntity customerNew = customer.get();
                customerNew.setFullName(userInfoRequest.getFullName());
                customerNew.getAccount().setEmail(userInfoRequest.getAccount().getEmail());
                customerNew.setId(userInfoRequest.getId());
                customerNew.setGender(userInfoRequest.getGender());
                customerNew.getAccount().setPhoneNumber(userInfoRequest.getAccount().getPhoneNumber());
                customerNew.getAccount().setId(userInfoRequest.getAccount().getId());
            customerNew.setAvatar(userInfoRequest.getAvatar());

            accountRepository.save(customerNew.getAccount());
                olCustomerService.save(customerNew);
                return true;
            } else if (userInfoRequest.getAccount().getRole().getFullName().equals("STAFF") || userInfoRequest.getAccount().getRole().equals("ADMIN")) {
                Optional<Employees> employee = Optional.ofNullable(olEmployeeService.findByAccount_Id(userInfoRequest.getAccount().getId()));
                Employees customerNew = employee.get();
                customerNew.setFullName(userInfoRequest.getFullName());
                customerNew.getAccount().setEmail(userInfoRequest.getAccount().getEmail());
                customerNew.setId(userInfoRequest.getId());
                customerNew.setGender(userInfoRequest.getGender());
                customerNew.getAccount().setPhoneNumber(userInfoRequest.getAccount().getPhoneNumber());
                customerNew.getAccount().setId(userInfoRequest.getAccount().getId());
                customerNew.setAvatar(userInfoRequest.getAvatar());
                accountRepository.save(customerNew.getAccount());
                olEmployeeService.save(customerNew);
                return true;
            }
        return false;
    }
//
//    @Override
//    public List<UserRequestDTO> getAllAccount() {
//        List<AccountEntity> accounts = accountRepository.findAll();
//        List<UserRequestDTO> userRequestDTOs = new ArrayList<>();
//        for (AccountEntity account : accounts) {
//            userRequestDTOs.add(mapAccountToUserRequestDTO(account));
//        }
//        return userRequestDTOs;
//    }
//
//    @Override
//    public AccountEntity createAccount(AccountEntity accountEntity) {
//        return accountRepository.save(accountEntity);
//    }


}
