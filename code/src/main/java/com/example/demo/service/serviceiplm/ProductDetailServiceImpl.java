package com.example.demo.service.serviceiplm;

import com.example.demo.entity.*;
import com.example.demo.repository.ProductDetailRepository;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    ProductDetailRepository productDetailRepository;

    @Autowired
    ProductService productService;

    @Autowired
    ColorService colorService;

    @Autowired
    SizeService sizeService;

    @Autowired
    ImageService imageService;

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
    public List<ProductDetail> getAllByPId(Long pid) {
        List<ProductDetail> productDetailList = productDetailRepository.findAllByProductIdOrderByCreatedAtDesc(pid);
        for (ProductDetail productDetail:
             productDetailList) {
            List<Image> imageList = imageService.getByPDid(productDetail.getId());
            if(productDetail.getQuantity() <= 0 || imageList.isEmpty()){
                productDetail.setStatus(2);
                productDetailRepository.save(productDetail);
            }
        }
        return productDetailRepository.findAllByProductIdOrderByCreatedAtDesc(pid);
    }



    @Override
    public ProductDetail saveI(ProductDetail productDetailReq, List<Image> images) {
        productDetailReq.setCreatedBy("admin");
        productDetailReq.setCreatedAt(new Date());
        productDetailReq.setUpdatedAt(new Date());
        productDetailReq.setUpdatedBy("admin");
        productDetailReq.setBarcode(genBarcode());
        ProductDetail newProductDetail = productDetailRepository.save(productDetailReq);
        if(!images.isEmpty()){
            imageService.saveAll(images, newProductDetail);
        }

        return newProductDetail;
    }

    @Override
    public ProductDetail updateI(ProductDetail productDetailReq, Long id, List<Image> images) {
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

            ProductDetail newProductDetail = productDetailRepository.save(productDetail);
//            imageService.saveAll(images, newProductDetail);
            if(!images.isEmpty()){
                imageService.saveAll(images, newProductDetail);
            }
            return newProductDetail;
//            return productDetailRepository.save(productDetail);
        }
        return null;
    }

    @Override
    public ProductDetail checkTrungFK(Product product, Color color, Size size) {
        return productDetailRepository.findProductDetailByProductAndColorAndSize(product, color, size);
    }

    @Override
    public List<ProductDetail> getAllPdExportExcel() {
        return productDetailRepository.findProductDetailByOrderByProductIdAsc();
    }

}
