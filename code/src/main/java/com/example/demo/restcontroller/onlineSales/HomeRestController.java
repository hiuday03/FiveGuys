package com.example.demo.restcontroller.onlineSales;


import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlHomeDataFillRespone;
import com.example.demo.model.response.onlineSales.OlViewProductDetailRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductResponse;
import com.example.demo.model.response.onlineSales.OlProductDetailInfo;
import com.example.demo.repository.onlineSales.OLProductRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class HomeRestController {

    @Autowired
    private OlCategoryService olCategoryService;

    @Autowired
    private OlColorService olColorService;

    @Autowired
    private OlSizeService olSizeService;

    @Autowired
    private OlMaterialService olMaterialService;



    @Autowired
    private OLProductService olProductService;

    @Autowired
    private OLProductRepository olProductRepository;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlImageService olImageService;

//    @GetMapping("/products")
//    public ResponseEntity<?> getAllOlProductsRespone(@RequestParam("page") Integer page) {
//        Page<OlHomeProductResponse> products = olProductService.getAllOlProductsRespone(page);
//
//        if (products.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No products found");
//        }
//        return ResponseEntity.ok(products);
//    }

//    @GetMapping("/list")
//    public ResponseEntity<?> getAllOlProductsRespone() {
////        List<OlHomeProductRespone> products =  olProductService.getAllOlProductsRespone();
////
////        if (products.isEmpty()) {
////            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No products found");
////        }
//
//        return ResponseEntity.ok(roleRepository.findAll());
//    }


    @GetMapping("/products/dataFill")
    public ResponseEntity<?> dataFill() {
        OlHomeDataFillRespone olHomeDataFillRespone = new OlHomeDataFillRespone();
        olHomeDataFillRespone.setCategoryList(olCategoryService.findAll());
        olHomeDataFillRespone.setColorList(olColorService.findAll());
        olHomeDataFillRespone.setSizeList(olSizeService.findAll());
        olHomeDataFillRespone.setMaterialList(olMaterialService.findAll());
        return ResponseEntity.ok(olHomeDataFillRespone);
    }


    @GetMapping("/products/colorAndSize/{id}")
    public ResponseEntity<?> detailInfo(@PathVariable("id") Long id) {
        OlViewProductDetailRespone olViewProductDetailRespone = olProductService.getOlDetailProductResponeById(id);

        if (olViewProductDetailRespone == null) {
            return ResponseEntity.notFound().build(); // Trả về mã HTTP 404 Not Found
        }

        List<Color> listOfColor = olProductDetailService.findDistinctColorsBySanPhamId(id);
        List<Size> listOfSize = olProductDetailService.findDistinctSizesBySanPhamId(id);

        OlProductDetailInfo productDetailInfo = new OlProductDetailInfo(olViewProductDetailRespone, listOfColor, listOfSize);

        return ResponseEntity.ok(productDetailInfo);
    }


    @GetMapping("/products/detail")
    public ResponseEntity<?> getDetail(@RequestParam(value = "coloId", required = false) Long coloId,
                                       @RequestParam(value = "sizeId", required = false) Long sizeId,
                                       @RequestParam(value = "productId", required = false) Long productId) {
        if (coloId != null && sizeId != null && productId != null) {
            ProductDetail productDetail = olProductDetailService.findByColorIdAndSizeIdAndProductId(coloId, sizeId, productId);
//            Employees employees = new Employees();
            return ResponseEntity.ok(productDetail);
        } else {
            return ResponseEntity.badRequest().body("Missing required parameters: coloId, sizeId, productId");
        }
    }

    @GetMapping("/products/detail/{id}")
    public ResponseEntity<?> getProductDetail(@PathVariable("id") Long id) {
        Optional<ProductDetail> productDetailOptional = olProductDetailService.findById(id);

        if (productDetailOptional.isPresent()) {
            ProductDetail productDetail = productDetailOptional.get();
            return ResponseEntity.ok(productDetail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/products/images")
    public ResponseEntity<?> getImagesByColorAndProduct(@RequestParam(value = "coloId", required = false) Long coloId,
                                                        @RequestParam(value = "productId", required = false) Long productId) {
        if (coloId != null  && productId != null) {
            List<ProductDetail> productDetail = olProductDetailService.findByColorIdAndProductId(coloId, productId);
            if (productDetail.get(0) != null){
                return ResponseEntity.ok(olImageService.findByProductDetailId(productDetail.get(0).getId()));

            }
        }
        return ResponseEntity.badRequest().body("Missing required parameters: coloId, sizeId, productId");
    }




    @GetMapping("/products")
    public ResponseEntity<?> searchProducts(
            @RequestParam(value = "sizes", required = false) List<Long> sizeIds,
            @RequestParam(value = "colors", required = false) List<Long> colorIds,
            @RequestParam(value = "categories", required = false) List<Long> categoryIds,
            @RequestParam(value = "materials", required = false) List<Long> materialIds,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "sortType", required = false) Integer sortType) {

        List<Size> sizes = sizeIds != null ? sizeIds.stream().map(Size::new).collect(Collectors.toList()) : null;
        List<Color> colors = colorIds != null ? colorIds.stream().map(Color::new).collect(Collectors.toList()) : null;
        List<Category> categories = categoryIds != null ? categoryIds.stream().map(Category::new).collect(Collectors.toList()) : null;
        List<Material> materials = materialIds != null ? materialIds.stream().map(Material::new).collect(Collectors.toList()) : null;
        Page<OlHomeProductResponse> products;
//        Page<Product> products2;
        Pageable pageable = PageRequest.of(page, 8);

//        products2 = olProductRepository.findProductsByFiltersSortedByPriceAscending(sizes, colors, categories, materials, pageable);

        if (sortType != null) {
            switch (sortType) {
                case 0:
                    products = olProductService.findProductsByFiltersSortedByNewest(sizes, colors, categories, materials, page);
                    break;
                case 1:
                    products = olProductService.findProductsByFiltersOrderedByTotalQuantitySold(sizes, colors, categories, materials, page);
                    break;
                case 2:
                    products = olProductService.findProductsByFiltersSortedByPriceAscending(sizes, colors, categories, materials, page);
                    break;
                case 3:
                    products = olProductService.findProductsOrderedByAveragePriceDescending(sizes, colors, categories, materials, page);
                    break;
                default:
                    products = olProductService.findProductsByFiltersSortedByNewest(sizes, colors, categories, materials, page);

                    break;
            }
        } else {
            products = olProductService.findProductsByFiltersSortedByNewest(sizes, colors, categories, materials, page);

        }
        return ResponseEntity.ok(products);
    }


    @GetMapping("/products/search")
    public ResponseEntity<?> searchProducts(@RequestParam(value = "keyword", required = false) String keyword) {
        List<OlHomeProductResponse> searchResults = olProductService.findByKeyword(keyword);
        return ResponseEntity.ok(searchResults);
    }



}
