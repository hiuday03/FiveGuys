package com.example.demo.repository.onlineSales;

import com.example.demo.entity.CartDetail;
import com.example.demo.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OlCustomerRepository extends JpaRepository<CustomerEntity, Long> {
    CustomerEntity findByAccount_Id(Long accountId);


}
