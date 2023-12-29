package com.example.demo.repository;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail, Long> {

    List<BillDetail> findAllByBillId(Long id);
}
