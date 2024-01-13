package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OLBillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findAllByCustomerEntity_IdAndStatus(Long id,int status);


    Optional<Bill> findById(Long id);

    List<Bill> findByPhoneNumber(String pn);

}
