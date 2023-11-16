package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return productRepository.findAll(pageable);
    }

    @Override
    public Product getById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product save(Product productReq) {
        productReq.setCreatedBy("admin");
        productReq.setCreatedAt(new Date());
        productReq.setUpdatedBy("admin");
        productReq.setUpdatedAt(new Date());
        return productRepository.save(productReq);
    }

    @Override
    public Product update(Product productReq, Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            Product product = productOptional.get();
            product.setCode(productReq.getCode());
            product.setName(productReq.getName());
            product.setCollar(productReq.getCollar());
            product.setWrist(productReq.getWrist());
            product.setDescribe(productReq.getDescribe());
            product.setBrand(productReq.getBrand());
            product.setUpdatedAt(new Date());
            product.setUpdatedBy("admin");
            product.setStatus(productReq.getStatus());

            return productRepository.save(product);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
        }else{
            System.err.println("productRepository.deleteById();");
        }
    }

    @Override
    public Product updateStatus(Integer status, Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            Product product = productOptional.get();
            product.setStatus(status);

            return productRepository.save(product);
        }
        return null;
    }
}
