package com.example.demo.repository.onlineSales;

import com.example.demo.entity.Color;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OLProductDetailRepository extends JpaRepository<ProductDetail, Long> {

    List<ProductDetail> findByProductAndStatus(Product product,int status);

//    @Query("SELECT c FROM ProductDetail c WHERE c.color.id = :colorId AND c.product.id = :productId")
//    List<ProductDetail> findChiTietSanPhamByMauSacAndSanPham(@Param("colorId") Long colorId, @Param("productId") UUID productId);

    @Query("SELECT c.color FROM ProductDetail c WHERE c.product.id = :productId AND c.status = 1 GROUP BY c.color")
    List<Color> findDistinctColorsBySanPhamId(@Param("productId") Long productId);

    @Query("SELECT c.size FROM ProductDetail c WHERE c.product.id = :productId AND c.status = 1 GROUP BY c.size")
    List<Size> findDistinctSizesBySanPhamId(@Param("productId") Long productId);

    ProductDetail findByColorIdAndSizeIdAndProductId(Long colorId, Long sizeId, Long productId);

    Optional<ProductDetail> findById(Long productDetailId);

    List<ProductDetail> findByColorIdAndProductIdAndStatus(Long colorId, Long productId,int status);
}
