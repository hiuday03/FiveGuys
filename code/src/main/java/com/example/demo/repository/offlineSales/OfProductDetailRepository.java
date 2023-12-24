package com.example.demo.repository.offlineSales;

import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.offlineSales.OfModelProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfProductDetailRepository extends JpaRepository<OfModelProductDetail, Long>{

}
