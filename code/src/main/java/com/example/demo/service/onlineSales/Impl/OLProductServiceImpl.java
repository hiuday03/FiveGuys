package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Image;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.model.response.onlineSales.OlViewProductDetailRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductRespone;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.repository.onlineSales.OLProductRepository;
import com.example.demo.service.onlineSales.OLProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Page<OlHomeProductRespone> getAllOlProductsRespone(Integer page) {
        Pageable pageable = PageRequest.of(page, 9);
        List<OlHomeProductRespone> olHomeProductResponeList = new ArrayList<>();
        Page<Product> productList = olProductRepository.findAll(pageable);

        for (Product product : productList) {
            List<ProductDetail> productDetails = olProductDetailRepository.findByProduct(product);

            OlHomeProductRespone olHomeProductRespone = new OlHomeProductRespone();
            olHomeProductRespone.setId(product.getId());
            olHomeProductRespone.setName(product.getName());
            olHomeProductRespone.setCode(product.getCode());
            olHomeProductRespone.setNameCategory(product.getCategory().getName());
            olHomeProductRespone.setNameMaterial(product.getMaterial().getName());
            olHomeProductRespone.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());

            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
            String firstName = !images.isEmpty() ? images.get(0).getName() : null;
            olHomeProductRespone.setImage(firstName);

            olHomeProductResponeList.add(olHomeProductRespone);
        }

        return new PageImpl<>(olHomeProductResponeList, pageable, productList.getTotalElements());
    }
    @Override
    public List<OlHomeProductRespone> getAllOlProductsRespone() {
        List<OlHomeProductRespone> olHomeProductResponeList = new ArrayList<>();
        List<Product> productList = olProductRepository.findAll();

        for (Product product : productList) {
            List<ProductDetail> productDetails = olProductDetailRepository.findByProduct(product);

            OlHomeProductRespone olHomeProductRespone = new OlHomeProductRespone();
            olHomeProductRespone.setId(product.getId());
            olHomeProductRespone.setName(product.getName());
            olHomeProductRespone.setCode(product.getCode());
            olHomeProductRespone.setNameCategory(product.getCategory().getName());
            olHomeProductRespone.setNameMaterial(product.getMaterial().getName());
            olHomeProductRespone.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());

            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
            String firstName = !images.isEmpty() ? images.get(0).getName() : null;
            olHomeProductRespone.setImage(firstName);

            olHomeProductResponeList.add(olHomeProductRespone);
        }

        return olHomeProductResponeList;
    }

    @Override
    public Optional<Product> findById(Long id) {
        Optional<Product> productOptional = olProductRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return Optional.of(product);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public OlViewProductDetailRespone getOlDetailProductResponeById(Long id) {
        Optional<Product> productOptional = olProductRepository.findById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            List<ProductDetail> productDetails = olProductDetailRepository.findByProduct(product);

            OlViewProductDetailRespone olViewProductDetailRespone = new OlViewProductDetailRespone();
            olViewProductDetailRespone.setId(product.getId());
            olViewProductDetailRespone.setCode(product.getCode());
            olViewProductDetailRespone.setName(product.getName());
            olViewProductDetailRespone.setWrist(product.getWrist());
            olViewProductDetailRespone.setCollar(product.getCollar());
            olViewProductDetailRespone.setBrand(product.getBrand());
            olViewProductDetailRespone.setDescribe(product.getDescribe());
            olViewProductDetailRespone.setNameCategory(product.getCategory().getName());
            olViewProductDetailRespone.setNameMaterial(product.getMaterial().getName());
            olViewProductDetailRespone.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());
            // Các thông tin khác có thể cập nhật tương tự

//            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
//            olDetailProductRespone.setImages(images);

            return olViewProductDetailRespone;
        }

        return null;
    }


}
