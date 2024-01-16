package com.example.demo.repository.offlineSales;

import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.offlineSales.OfModelProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfProductDetailRepository extends JpaRepository<OfModelProductDetail, Long>{
    @Query(value = "SELECT p from OfModelProductDetail p WHERE p.status = 1 AND p.quantity > 0")
    List<OfModelProductDetail> getAll();

    @Query(value = "SELECT p FROM OfModelProductDetail p WHERE p.barcode = :barcode AND p.quantity > 0 AND p.status = 1")
    OfModelProductDetail getByBarcode(@Param("barcode") String barcode);
}
