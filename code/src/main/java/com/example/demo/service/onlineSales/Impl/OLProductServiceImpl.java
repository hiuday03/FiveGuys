package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Image;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.onlineSales.OlProductRespone;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.repository.onlineSales.OLProductRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OLProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OLProductServiceImpl implements OLProductService {

    @Autowired
    private OLProductRepository olProductRepository;

    @Autowired
    private OLProductDetailRepository olProductDetailRepository;


    @Override
    public List<Product> getAllProducts() {
        return olProductRepository.findAll();
    }

    @Override
    public List<OlProductRespone> getAllOlProductsRespone() {
        List<OlProductRespone> olProductResponeList = new ArrayList<>();
        List<Product> productList = olProductRepository.getAllProducts();

        for (Product product : productList) {
            List<ProductDetail> productDetails = olProductDetailRepository.findByProduct(product);

            OlProductRespone olProductRespone = new OlProductRespone();
            olProductRespone.setId(product.getId());
            olProductRespone.setName(product.getName());
            olProductRespone.setCode(product.getCode());
            olProductRespone.setNameCategory(product.getCategory().getName());
            olProductRespone.setNameMaterial(product.getMaterial().getName());
            olProductRespone.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());

            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
            String firstName = !images.isEmpty() ? images.get(0).getName() : null;
            olProductRespone.setImage(firstName);

            olProductResponeList.add(olProductRespone);
        }

        return olProductResponeList;
    }


}
