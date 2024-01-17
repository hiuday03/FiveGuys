package com.example.demo.repository;

import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    @Query("SELECT c FROM CustomerEntity c WHERE c.account.id = :accountId")
    List<CustomerEntity> findByAccountId(@Param("accountId") Long accountId);

    Optional<CustomerEntity> findByAccount_Id(Long accountId);

    @Query("SELECT c FROM CustomerEntity c WHERE c.status = :c")
    List<CustomerEntity> getSStatus(Integer c);
}
