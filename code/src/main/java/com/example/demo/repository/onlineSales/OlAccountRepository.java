package com.example.demo.repository.onlineSales;

import com.example.demo.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface OlAccountRepository extends JpaRepository<AccountEntity, Long> {

    Optional<AccountEntity> findByAccount(String username);
}
