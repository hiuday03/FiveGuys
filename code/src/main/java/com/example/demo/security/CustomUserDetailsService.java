package com.example.demo.security;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Roles;
import com.example.demo.repository.AccountRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Roles role) {
        return Collections.singletonList(new SimpleGrantedAuthority(role.getFullName().toUpperCase()));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AccountEntity> accountOptional = accountRepository.findByAccount(username);
//        System.out.println("Ok2");
        if (!accountOptional.isPresent()) {
            throw new UsernameNotFoundException("Không tìm thấy người dùng với tên đăng nhập: " + username);
        }

        AccountEntity account = accountOptional.get();
//        System.out.println(account);
        return new User(account.getAccount(), account.getPassword(), getAuthorities(account.getRole()));
    }
}
