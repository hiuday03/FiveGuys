package com.example.demo.security.jwt;

import com.example.demo.entity.AccountEntity;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final OlAccountRepository userDao;

    public JwtUserDetailsService(OlAccountRepository userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Optional<AccountEntity> user = userDao.findByAccount(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("User not found with username: " + user.get().getAccount());
        }
        return new User(user.get().getAccount(), user.get().getPassword(), new ArrayList<>());
    }

}
