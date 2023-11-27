package com.example.demo.repository.onlineSales;

import com.example.demo.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import java.util.List;

@Repository
public interface OLProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p FROM Product p " +
            "JOIN p.productDetails pd " +
            "JOIN pd.size s " +
            "JOIN pd.color c " +
            "JOIN p.category cat " +
            "JOIN p.material mat " +
            "WHERE (:sizes IS NULL OR s IN :sizes) " +
            "AND (:colors IS NULL OR c IN :colors) " +
            "AND (:categories IS NULL OR cat IN :categories) " +
            "AND (:materials IS NULL OR mat IN :materials)")
    Page<Product> findProductsBySizesAndColorsAndCategoriesAndMaterials(
            @Param("sizes") List<Size> sizes,
            @Param("colors") List<Color> colors,
            @Param("categories") List<Category> categories,
            @Param("materials") List<Material> materials,
            Pageable pageable
    );

//    @Query("SELECT DISTINCT p FROM Product p " +
//            "JOIN p.productDetails pd " +
//            "JOIN pd.size s " +
//            "JOIN pd.color c " +
//            "JOIN p.category cat " +
//            "JOIN p.material mat " +
//            "WHERE (:sizes IS NULL OR s IN :sizes) " +
//            "AND (:colors IS NULL OR c IN :colors) " +
//            "AND (:categories IS NULL OR cat IN :categories) " +
//            "AND (:materials IS NULL OR mat IN :materials)")
//    List<Product> findProductsBySizesAndColorsAndCategoriesAndMaterials2(
//            @Param("sizes") List<Size> sizes,
//            @Param("colors") List<Color> colors,
//            @Param("categories") List<Category> categories,
//            @Param("materials") List<Material> materials
//    );

    @Query("SELECT p FROM Product p " +
            "JOIN p.productDetails pd " +
            "JOIN pd.size s " +
            "JOIN pd.color c " +
            "JOIN p.category cat " +
            "JOIN p.material mat " +
            "WHERE (:sizes IS NULL OR s IN :sizes) " +
            "AND (:colors IS NULL OR c IN :colors) " +
            "AND (:categories IS NULL OR cat IN :categories) " +
            "AND (:materials IS NULL OR mat IN :materials) " +
            "GROUP BY p " +
            "ORDER BY AVG(pd.price) ASC")
    Page<Product> findProductsByFiltersSortedByPriceAscending(
            @Param("sizes") List<Size> sizes,
            @Param("colors") List<Color> colors,
            @Param("categories") List<Category> categories,
            @Param("materials") List<Material> materials,
            Pageable pageable
    );

    @Query("SELECT p FROM Product p " +
            "JOIN p.productDetails pd " +
            "JOIN pd.size s " +
            "JOIN pd.color c " +
            "JOIN p.category cat " +
            "JOIN p.material mat " +
            "WHERE (:sizes IS NULL OR s IN :sizes) " +
            "AND (:colors IS NULL OR c IN :colors) " +
            "AND (:categories IS NULL OR cat IN :categories) " +
            "AND (:materials IS NULL OR mat IN :materials) " +
            "GROUP BY p " +
            "ORDER BY AVG(pd.price) DESC")
    Page<Product> findProductsOrderedByAveragePriceDescending(
            @Param("sizes") List<Size> sizes,
            @Param("colors") List<Color> colors,
            @Param("categories") List<Category> categories,
            @Param("materials") List<Material> materials,
            Pageable pageable
    );

    @Query("SELECT p " +
            "FROM Product p " +
            "JOIN p.productDetails pd " +
            "LEFT JOIN pd.billDetails bd " +
            "JOIN pd.size s " +
            "JOIN pd.color c " +
            "JOIN p.category cat " +
            "JOIN p.material mat " +
            "WHERE (:sizes IS NULL OR s IN :sizes) " +
            "AND (:colors IS NULL OR c IN :colors) " +
            "AND (:categories IS NULL OR cat IN :categories) " +
            "AND (:materials IS NULL OR mat IN :materials) " +
            "GROUP BY p " +
            "ORDER BY COALESCE(SUM(bd.quantity), 0) DESC")
    Page<Product> findProductsByFiltersOrderedByTotalQuantitySold(
            @Param("sizes") List<Size> sizes,
            @Param("colors") List<Color> colors,
            @Param("categories") List<Category> categories,
            @Param("materials") List<Material> materials,
            Pageable pageable
    );



//                "GROUP BY p.id,p.brand ,p.category,p.code,p.collar,p.createdAt,p.createdBy,p.describe,p.material,p.name,p.productDetails,p.status " +

    @Query("SELECT p FROM Product p JOIN p.category c JOIN p.material m WHERE " +
            "p.code LIKE %:keyword% OR p.name LIKE %:keyword% OR p.collar LIKE %:keyword% " +
            "OR p.wrist LIKE %:keyword% OR p.describe LIKE %:keyword% " +
            "OR c.name LIKE %:keyword% OR m.name LIKE %:keyword%")
    List<Product> findByKeyword(String keyword);

}
