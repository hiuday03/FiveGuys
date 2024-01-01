package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OLBillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findAllByCustomerEntity_IdAndStatus(Long id,int status);

}
