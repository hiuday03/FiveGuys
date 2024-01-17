package com.example.demo.repository;

import com.example.demo.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<AddressEntity, Long> {
    @Query("SELECT a FROM AddressEntity a WHERE a.customer.id = :customerId")
    List<AddressEntity> findByCustomerId(@Param("customerId") Long customerId);

    @Query("SELECT a FROM AddressEntity a WHERE a.status = :a")
    List<AddressEntity> getSStatus(Integer a);
}
