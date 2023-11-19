package com.example.demo.restcontroller.onlineSales;


import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlViewProductDetailRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductRespone;
import com.example.demo.model.response.onlineSales.OlProductDetailInfo;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OLProductService;
import com.example.demo.service.onlineSales.OlImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/api/ol")
public class HomeRestController {

    @Autowired
    private OLProductService olProductService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlImageService olImageService;

    @GetMapping("/products")
    public ResponseEntity<?> getAllOlProductsRespone(@RequestParam("page") Integer page) {
        Page<OlHomeProductRespone> products = olProductService.getAllOlProductsRespone(page);

        if (products.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No products found");
        }
        return ResponseEntity.ok(products);
    }

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
            Employees employees = new Employees();
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




}
