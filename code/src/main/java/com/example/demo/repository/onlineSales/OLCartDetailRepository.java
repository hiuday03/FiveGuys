package com.example.demo.repository.onlineSales;

import com.example.demo.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OLCartDetailRepository extends JpaRepository<CartDetail, Long> {

    List<CartDetail> findAllByCart_IdAndStatus(Long idGioHang,int status);

    void deleteById(Long id);

    void deleteAllByCart_Id(Long idGioHang);

    @Query("SELECT COALESCE(SUM(cd.quantity), 0) FROM CartDetail cd WHERE cd.cart.id = :cartId AND cd.productDetail.id = :productDetailId")
    int getTotalQuantityInCart(@Param("cartId") Long cartId, @Param("productDetailId") Long productDetailId);

    @Query("SELECT cd FROM CartDetail cd WHERE cd.cart.id = :cartId AND cd.productDetail.id = :productDetailId")
    CartDetail findCartDetail(@Param("cartId") Long cartId, @Param("productDetailId") Long productDetailId);


}
