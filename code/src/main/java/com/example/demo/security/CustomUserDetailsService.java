package com.example.demo.security;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import com.example.demo.service.onlineSales.OlAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final OlAccountService accountRepository;

    @Autowired
    public CustomUserDetailsService(OlAccountService accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AccountEntity> accountOptional = accountRepository.findByAccount(username);

        if (accountOptional.isPresent()) {
            AccountEntity account = accountOptional.get();
            return new CustomUserDetails(account);
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng với tên đăng nhập: " + username);
        }
    }
}
