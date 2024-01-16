package com.example.demo.service.onlineSales;

import com.example.demo.entity.Color;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Size;
import com.example.demo.model.response.onlineSales.OlProductDetailResponse;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OLProductDetailService {

    List<ProductDetail> findAllByProduct(Product product);

    List<ProductDetail> findByProduct(Product product);

    List<Color> findDistinctColorsBySanPhamId( Long productId);

    List<Size> findDistinctSizesBySanPhamId( Long productId);

    ProductDetail findByColorIdAndSizeIdAndProductId(Long colorId, Long sizeId, Long productId);

    Optional<OlProductDetailResponse> findByIdShow(Long productDetailId);

    Optional<ProductDetail> findById(Long productDetailId);

    ProductDetail save(ProductDetail productDetail);

    List<ProductDetail> findByColorIdAndProductId(Long colorId, Long productId);

    List<ProductDetail> findByProduct_Id(Long productId);

}
