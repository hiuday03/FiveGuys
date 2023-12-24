package com.example.demo.repository.offlineSales;

import com.example.demo.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OfAddressRepository extends JpaRepository<AddressEntity, Long> {
    @Query("SELECT a FROM AddressEntity a WHERE a.customer.id = :customerId AND a.defaultAddress = true")
    AddressEntity findByCustomerId(@Param("customerId") Long customerId);
}
