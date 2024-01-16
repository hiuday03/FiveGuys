package com.example.demo.service.onlineSales;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlViewProductDetailRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OLProductService {

    List<Product> getAllProducts();

    Product save(Product product);

    Page<OlHomeProductResponse> getAllOlProductsRespone(Integer page);

    List<OlHomeProductResponse> getAllOlProductsRespone();

    Optional<Product> findById(Long id);

    OlViewProductDetailRespone getOlDetailProductResponeById(Long id);

//    Page<OlHomeProductResponse> findProductsByFilters(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials,Integer page);

    List<OlHomeProductResponse> findProductsByFiltersSortedByNewest(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials);

    List<OlHomeProductResponse> findProductsByFiltersSortedByPriceAscending(
            List<Size> sizes,
            List<Color> colors,
            List<Category> categories,
            List<Material> materials
    );

    List<OlHomeProductResponse> findProductsOrderedByAveragePriceDescending(
            List<Size> sizes,
            List<Color> colors,
            List<Category> categories,
            List<Material> materials
    );

    List<OlHomeProductResponse> findProductsByFiltersOrderedByTotalQuantitySold(
         List<Size> sizes,
        List<Color> colors,
        List<Category> categories,
        List<Material> materials
);

//    Page<OlHomeProductResponse> findBestSellingProducts(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page);
List<OlHomeProductResponse> findByKeyword(String keyword);

    List<OlHomeProductResponse> findAllProductsOrderedByTotalQuantitySold();

    List<OlHomeProductResponse> findProductsOrderedByCreatedAt();

    List<OlHomeProductResponse> findProductsByCategoryId( Long categoryId);

}
