package com.example.demo.restcontroller.onlineSales;


import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.*;
import com.example.demo.repository.onlineSales.OLProductRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
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
    private OlBillService olBillService;

    @Autowired
    private OLProductService olProductService;

    @Autowired
    private OLProductRepository olProductRepository;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlImageService olImageService;


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
            return ResponseEntity.notFound().build();
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
        Optional<OlProductDetailResponse> productDetailOptional = olProductDetailService.findByIdShow(id);

        if (productDetailOptional.isPresent()) {
            OlProductDetailResponse productDetail = productDetailOptional.get();

            // Kiểm tra số lượng ở đây và gửi cả thông tin số lượng về
            if (productDetail.getQuantity() > 0) {
                return ResponseEntity.ok(productDetail);
            } else {
                return ResponseEntity.ok(2);
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/products/images")
    public ResponseEntity<?> getImagesByColorAndProduct(
            @RequestParam(value = "coloId", required = false) Long coloId,
            @RequestParam(value = "productId", required = false) Long productId) {

        if (coloId != null && productId != null) {
            List<ProductDetail> productDetails = olProductDetailService.findByColorIdAndProductId(coloId, productId);

            List<Image> largestSizeImages = new ArrayList<>();

            int maxSize = 0;

            for (ProductDetail productDetail : productDetails) {
                if (productDetail != null) {
                    List<Image> images = olImageService.findByProductDetailId(productDetail.getId());
                    int currentSize = images.size();

                    if (currentSize > maxSize) {
                        maxSize = currentSize;
                        largestSizeImages = images;
                    }
                }
            }

            if (!largestSizeImages.isEmpty()) {
                return ResponseEntity.ok(largestSizeImages);
            }
        }

        return ResponseEntity.badRequest().body("Missing required parameters: coloId, productId");
    }






    @GetMapping("/products")
    public ResponseEntity<?> searchProducts(
            @RequestParam(value = "sizes", required = false) List<Long> sizeIds,
            @RequestParam(value = "colors", required = false) List<Long> colorIds,
            @RequestParam(value = "categories", required = false) List<Long> categoryIds,
            @RequestParam(value = "materials", required = false) List<Long> materialIds,
            @RequestParam(value = "sortType", required = false) Integer sortType) {

        List<Size> sizes = sizeIds != null ? sizeIds.stream().map(Size::new).collect(Collectors.toList()) : null;
        List<Color> colors = colorIds != null ? colorIds.stream().map(Color::new).collect(Collectors.toList()) : null;
        List<Category> categories = categoryIds != null ? categoryIds.stream().map(Category::new).collect(Collectors.toList()) : null;
        List<Material> materials = materialIds != null ? materialIds.stream().map(Material::new).collect(Collectors.toList()) : null;
        List<OlHomeProductResponse> products;
        if (sortType != null) {
            switch (sortType) {
                case 0:
                    products = olProductService.findProductsByFiltersSortedByNewest(sizes, colors, categories, materials);
                    break;
                case 1:
                    products = olProductService.findProductsByFiltersOrderedByTotalQuantitySold(sizes, colors, categories, materials);
                    break;
                case 2:
                    products = olProductService.findProductsByFiltersSortedByPriceAscending(sizes, colors, categories, materials);
                    break;
                case 3:
                    products = olProductService.findProductsOrderedByAveragePriceDescending(sizes, colors, categories, materials);
                    break;
                default:
                    products = olProductService.findProductsByFiltersSortedByNewest(sizes, colors, categories, materials);

                    break;
            }
        } else {
            products = olProductService.findProductsByFiltersSortedByNewest(sizes, colors, categories, materials);

        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/productsType")
    public ResponseEntity<List<OlHomeProductResponse>> getProductsBySortType(@RequestParam("sortType") int sortType) {
        List<OlHomeProductResponse> responses = new ArrayList<>();

        if (sortType == 0) {
            responses = olProductService.findProductsOrderedByCreatedAt();
        } else if (sortType == 1) {
            responses = olProductService.findAllProductsOrderedByTotalQuantitySold();
        }

        if (responses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(responses);
        }
    }


    @GetMapping("/products/search")
    public ResponseEntity<?> searchProducts(@RequestParam(value = "keyword", required = false) String keyword) {
        List<OlHomeProductResponse> searchResults = olProductService.findByKeyword(keyword);
        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/products/category")
    public ResponseEntity<?> getProductByCategory(@RequestParam(value = "productId", required = false) Long productId) {
        List<OlHomeProductResponse> searchResults = olProductService.findProductsByCategoryId(productId);
        return ResponseEntity.ok(searchResults);
    }



    // lấy số lượng productDetail validate
    @GetMapping("/productDetail/quantity/{id}")
    public ResponseEntity<?> getProductQuantity(@PathVariable("id") Long id) {
        Optional<ProductDetail> productDetailOptional = olProductDetailService.findById(id);
        if (productDetailOptional.isPresent()) {
            ProductDetail productDetail = productDetailOptional.get();
            return ResponseEntity.ok(productDetail.getQuantity());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/checkOrder/{phoneNumber}")
    public ResponseEntity<?> getBillById(@PathVariable String phoneNumber) {
        List<Bill> bill = olBillService.findByPhoneNumber(phoneNumber);
        if (bill.size() > 0){
            return ResponseEntity.ok(bill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/bills/{id}")
    public ResponseEntity<?> getBillById(@PathVariable Long id) {
        OlBillResponse bill = olBillService.findBYId(id);
        if (bill != null) {
            return ResponseEntity.ok(bill);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
