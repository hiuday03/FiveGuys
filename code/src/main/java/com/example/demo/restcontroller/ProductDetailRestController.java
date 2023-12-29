package com.example.demo.restcontroller;

import com.example.demo.entity.Image;
import com.example.demo.entity.ProductDetail;
import com.example.demo.model.request.product.ProductDetailRequest;
import com.example.demo.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/productDetail")
public class ProductDetailRestController {

    @Autowired
    ProductDetailService productDetailService;

    @GetMapping("")
    public ResponseEntity<?> index(){
        List<ProductDetail> productDetails = productDetailService.getAll();
        return ResponseEntity.ok(productDetails);
    }

    @GetMapping("/page")
    public ResponseEntity<?> page(@RequestParam("page") Integer page){
        Page<ProductDetail> productDetails = productDetailService.getAll(page);
        return ResponseEntity.ok(productDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        ProductDetail productDetail = productDetailService.getById(id);
        return ResponseEntity.ok(productDetail);
    }

//    @PostMapping("")
//    public ResponseEntity<?> add(@RequestBody ProductDetail productDetailReq,
//                                 @RequestBody List<Image> images){
//        ProductDetail productDetail = productDetailService.saveI(productDetailReq, images);
//        return ResponseEntity.ok(productDetail);
//    }

    @PostMapping("")
    public ResponseEntity<?> add(@RequestBody ProductDetailRequest productDetailRequest){
        ProductDetail productDetail
                = productDetailService.saveI(productDetailRequest.getProductDetail(),
                                    productDetailRequest.getImagesList());
        return ResponseEntity.ok(productDetail);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody ProductDetail productDetailReq,
                                    @PathVariable("id") Long id){
        ProductDetail productDetail = productDetailService.update(productDetailReq, id);
        return ResponseEntity.ok(productDetail);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody Integer status,
                                    @PathVariable("id") Long id){
        ProductDetail productDetail = productDetailService.updateStatus(status, id);
        return ResponseEntity.ok(productDetail);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        productDetailService.delete(id);
    }

    @PostMapping("/checkFk")
    public ProductDetail checkTrungFk(@RequestBody ProductDetail productDetailReq){
        return productDetailService.checkTrungFK(
                productDetailReq.getProduct(), productDetailReq.getColor(), productDetailReq.getSize());
    }

}
