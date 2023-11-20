package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.ProductDetailRepository;
import com.example.demo.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    ProductDetailRepository productDetailRepository;

    @Override
    public List<ProductDetail> getAll() {
        return productDetailRepository.findAll();
    }

    @Override
    public Page<ProductDetail> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return productDetailRepository.findAll(pageable);
    }

    @Override
    public ProductDetail getById(Long id) {
        return productDetailRepository.findById(id).orElse(null);
    }

    @Override
    public ProductDetail save(ProductDetail productDetailReq) {
        productDetailReq.setCreatedBy("admin");
        productDetailReq.setCreatedAt(new Date());
        productDetailReq.setUpdatedAt(new Date());
        productDetailReq.setUpdatedBy("admin");
        productDetailReq.setBarcode(genBarcode());
        productDetailReq.setStatus(2);
        return productDetailRepository.save(productDetailReq);
    }

    public String genBarcode(){
        Integer random = (int ) (Math.random() * 893999999 + 893000000);
//        Random rand = new Random();
//        Integer barcode = rand.nextInt((893999999 - 893000000) + 1) + 893000000;
        return random + "";
    }

    @Override
    public ProductDetail update(ProductDetail productDetailReq, Long id) {
        Optional<ProductDetail> productDetailOptional = productDetailRepository.findById(id);
        if(productDetailOptional.isPresent()){
            ProductDetail productDetail = productDetailOptional.get();
            productDetail.setImportPrice(productDetailReq.getImportPrice());
            productDetail.setPrice(productDetailReq.getPrice());
            productDetail.setQuantity(productDetailReq.getQuantity());
            productDetail.setBarcode(productDetailReq.getBarcode());
            productDetail.setCreatedBy(productDetailReq.getCreatedBy());
            productDetail.setCreatedAt(productDetailReq.getCreatedAt());
            productDetail.setUpdatedAt(productDetailReq.getUpdatedAt());
            productDetail.setUpdatedBy(productDetailReq.getUpdatedBy());
            productDetail.setStatus(productDetailReq.getStatus());
            productDetail.setProduct(productDetailReq.getProduct());
            productDetail.setSize(productDetailReq.getSize());
            productDetail.setColor(productDetailReq.getColor());

            return productDetailRepository.save(productDetail);
        }
        return null;
    }

    @Override
    public ProductDetail updateStatus(Integer status, Long id) {
        Optional<ProductDetail> productDetailOptional = productDetailRepository.findById(id);
        if(productDetailOptional.isPresent()){
            ProductDetail productDetail = productDetailOptional.get();
            productDetail.setStatus(status);

            return productDetailRepository.save(productDetail);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if(productDetailRepository.existsById(id)){
            productDetailRepository.deleteById(id);
        }else{
            System.out.println("loi del prodetail");
        }
    }

    @Override
    public Page<ProductDetail> getAllByPId(Long pid, Integer page) {
        Pageable pageable = PageRequest.of(page, 100);
        return productDetailRepository.findAllByProductId(pid, pageable);
    }

}
