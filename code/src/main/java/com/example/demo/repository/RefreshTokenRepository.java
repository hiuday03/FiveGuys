package com.example.demo.repository;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {


    Optional<RefreshToken> findById(Long id);

    Optional<RefreshToken> findByToken(String token);

    void deleteByAccountEntity(AccountEntity accountEntity);

}
