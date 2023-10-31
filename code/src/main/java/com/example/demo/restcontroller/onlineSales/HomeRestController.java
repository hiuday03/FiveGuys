package com.example.demo.restcontroller.onlineSales;


import com.example.demo.entity.*;
import com.example.demo.entity.status.RoleName;
import com.example.demo.model.response.onlineSales.OlDetailProductRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductRespone;
import com.example.demo.model.response.onlineSales.OlProductDetailInfo;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OLProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/api/ol")
public class HomeRestController {

    @Autowired
    private OLProductService olProductService;

    @Autowired
    private OLProductDetailService olProductDetailService;

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
//        List<OlHomeProductRespone> products =  olProductService.getAllOlProductsRespone();
//
//        if (products.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No products found");
//        }
//
//        return ResponseEntity.ok(products);
//    }

    @GetMapping("/products/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id) {
        OlDetailProductRespone olDetailProductRespone = olProductService.getOlDetailProductResponeById(id);

        if (olDetailProductRespone == null) {
            return ResponseEntity.notFound().build(); // Trả về mã HTTP 404 Not Found
        }

        List<Color> listOfColor = olProductDetailService.findDistinctColorsBySanPhamId(id);
        List<Size> listOfSize = olProductDetailService.findDistinctSizesBySanPhamId(id);

        OlProductDetailInfo productDetailInfo = new OlProductDetailInfo(olDetailProductRespone, listOfColor, listOfSize);

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



}
