package com.example.demo.service;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.RefreshToken;
import com.example.demo.entity.Roles;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenService {

    RefreshToken save(RefreshToken roles);

    void delete(Long id);

    Optional<RefreshToken> findByToken(String token);

     RefreshToken createRefreshToken(UserDetails userDetails, AccountEntity accountEntity);

    void deleteByAccount(AccountEntity accountEntity);

    AccountEntity verifyExpiration(String token);

}
