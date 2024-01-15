package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import com.example.demo.repository.ProductDetailRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductDetailService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductDetailRepository productDetailRepository;

    @Override
    public List<Product> getAll() {
        for (Product product: productRepository.findAllByOrderByCreatedAtDesc()) {
            int totalStatusPD1 = 0;
            List<ProductDetail> productDetailList = productDetailRepository.findAllByProductIdOrderByCreatedAtDesc(product.getId());
            for (ProductDetail pd : productDetailList) {
                if(pd.getStatus() == 1){
                    totalStatusPD1++;
                }
            }
            if(totalStatusPD1 == 0){
                updateStatus(2, product.getId());
            }
        }
        return productRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Page<Product> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return productRepository.findAll(pageable);
    }

    @Override
    public Product getById(Long id) {
        int totalStatusPD1 = 0;
        List<ProductDetail> productDetailList = productDetailRepository.findAllByProductIdOrderByCreatedAtDesc(id);
        for (ProductDetail pd : productDetailList) {
            if(pd.getStatus() == 1){
                totalStatusPD1++;
            }
        }
        if(totalStatusPD1 == 0){
            updateStatus(2, id);
        }
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product save(Product productReq) {
        if(productReq.getCode() == null || productReq.getCode().isEmpty() || productReq.getCode().isBlank()){
            productReq.setCode(genmahd());
        }
        productReq.setCreatedBy("admin");
        productReq.setCreatedAt(new Date());
        productReq.setUpdatedBy("admin");
        productReq.setUpdatedAt(new Date());
        productReq.setStatus(2);
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
            product.setUpdatedAt(productReq.getUpdatedAt());
            product.setUpdatedBy(productReq.getUpdatedBy());
            product.setStatus(productReq.getStatus());

            return productRepository.save(product);
        }
        return null;
    }

    private String genmahd() {
        List<Product> list = productRepository.findAll();
        System.out.println(list.size());
        if (list.size() == 0) {
            return "SP0001";
        } else {
            int num = list.size() + 1;
            return "SP" + (String.format("%04d", num));
        }
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

    @Override
    public Page<Product> searchByStatus(Integer status, Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return productRepository.searchByStatus(status, pageable);
    }

    @Override
    public List<Product> getAllExportExcel() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> saveAll(List<Product> productList) {
        List<Product> listInDatabase = productRepository.findAll();
        int sizeListInDB = listInDatabase.size();
//        int sizeListProduct = productList.size();
//        int total = sizeListInDB + sizeListProduct + 1;
        int miliseconds = 1;
        for (Product p:
             productList) {
            if(p.getCode() == null || p.getCode().isEmpty() || p.getCode().isBlank()){
                sizeListInDB++;
                p.setCode("SP" + (String.format("%04d", sizeListInDB)));
                p.setCreatedBy("admin");


                Date currentDate = new Date();
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(currentDate);
                miliseconds += 100;
                calendar.add(Calendar.MILLISECOND, miliseconds);
                Date newDate = calendar.getTime();


                p.setCreatedAt(newDate);
                p.setUpdatedBy("admin");
                p.setUpdatedAt(newDate);
                p.setStatus(2);
            }
        }
        return productRepository.saveAll(productList);
    }
}
