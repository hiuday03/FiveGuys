package com.example.demo.repository.onlineSales;

import com.example.demo.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OLCartDetailRepository extends JpaRepository<CartDetail, Long> {

    List<CartDetail> findAllByCart_Id(Long idGioHang);

    void deleteById(Long id);

    void deleteAllByCart_Id(Long idGioHang);

}
