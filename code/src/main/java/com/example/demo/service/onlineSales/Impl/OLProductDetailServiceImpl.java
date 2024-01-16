package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlProductDetailResponse;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OLProductDetailServiceImpl implements OLProductDetailService {

    @Autowired
    private OLProductDetailRepository olProductDetailRepository;


    @Override
    public List<ProductDetail> findAllByProduct(Product product) {
        return olProductDetailRepository.findAllByProduct(product);
    }

    @Override
    public List<ProductDetail> findByProduct(Product product) {
        return olProductDetailRepository.findByProductAndStatus(product,1);
    }

    @Override
    public List<Color> findDistinctColorsBySanPhamId(Long productId) {
        return olProductDetailRepository.findDistinctColorsBySanPhamId(productId);
    }

    @Override
    public List<Size> findDistinctSizesBySanPhamId(Long productId) {
        return olProductDetailRepository.findDistinctSizesBySanPhamId(productId);
    }

    @Override
    public ProductDetail findByColorIdAndSizeIdAndProductId(Long colorId, Long sizeId, Long productId) {
        return olProductDetailRepository.findByColorIdAndSizeIdAndProductIdAndStatus(colorId,sizeId,productId,1);
    }

    @Override
    public Optional<ProductDetail> findById(Long productDetailId) {
        return olProductDetailRepository.findById(productDetailId);
    }

    public OlProductDetailResponse fromProductDetail(ProductDetail productDetail) {
        OlProductDetailResponse response = new OlProductDetailResponse();
        response.setId(productDetail.getId());
        response.setImportPrice(productDetail.getImportPrice());
        response.setPrice(productDetail.getPrice());
        response.setQuantity(productDetail.getQuantity());
        response.setBarcode(productDetail.getBarcode());
        response.setCreatedAt(productDetail.getCreatedAt());
        response.setUpdatedAt(productDetail.getUpdatedAt());
        response.setCreatedBy(productDetail.getCreatedBy());
        response.setUpdatedBy(productDetail.getUpdatedBy());
        response.setStatus(productDetail.getStatus());
        response.setProduct(productDetail.getProduct());
        response.setSize(productDetail.getSize());
        response.setColor(productDetail.getColor());
        response.setImages(productDetail.getImages());
        response.setBillDetails(productDetail.getBillDetails());

        if (productDetail.getStatus() == 1) {
            List<Image> images = productDetail.getImages();

            if (images != null && !images.isEmpty()) {
                Image firstImageWithNonNullPath = images.stream()
                        .filter(image -> image != null && image.getPath() != null)
                        .findFirst()
                        .orElse(null);

                if (firstImageWithNonNullPath != null) {
                    response.setPath(firstImageWithNonNullPath.getPath());
                }
            }
        } else {
            response.setPath(null);
        }

        return response;
    }



    @Override
    public Optional<OlProductDetailResponse> findByIdShow(Long productDetailId) {
        Optional<ProductDetail> productDetail = olProductDetailRepository.findById(productDetailId);

        if (productDetail.isPresent()) {
            OlProductDetailResponse response = fromProductDetail(productDetail.get());
            // Sử dụng đối tượng response ở đây
            return Optional.of(response);
        } else {
            // Xử lý khi không tìm thấy ProductDetail
            return Optional.empty();
        }
    }




    @Override
    public ProductDetail save(ProductDetail productDetail) {
        return olProductDetailRepository.save(productDetail);
    }

    @Override
    public List<ProductDetail> findByColorIdAndProductId(Long colorId, Long productId) {
        return olProductDetailRepository.findByColorIdAndProductIdAndStatus(colorId,productId,1);
    }

    @Override
    public List<ProductDetail> findByProduct_Id(Long productId) {
        return olProductDetailRepository.findByProduct_Id(productId);
    }

}
