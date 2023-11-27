package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlViewProductDetailRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductResponse;
import com.example.demo.repository.onlineSales.OLProductRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OLProductService;
import com.example.demo.service.onlineSales.OlBillDetailService;
import com.example.demo.service.onlineSales.OlRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OLProductServiceImpl implements OLProductService {

    @Autowired
    private OLProductRepository olProductRepository;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlBillDetailService billDetailService;

    @Autowired
    private OlRatingService olRatingService;


    @Override
    public List<Product> getAllProducts() {
        return olProductRepository.findAll();
    }

    @Override
    public Page<OlHomeProductResponse> getAllOlProductsRespone(Integer page) {
        Pageable pageable = PageRequest.of(page, 9);
        List<OlHomeProductResponse> olHomeProductResponseList = new ArrayList<>();
        Page<Product> productList = olProductRepository.findAll(pageable);

        for (Product product : productList) {
            List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);

            OlHomeProductResponse olHomeProductResponse = new OlHomeProductResponse();
            olHomeProductResponse.setId(product.getId());
            olHomeProductResponse.setName(product.getName());
            olHomeProductResponse.setCode(product.getCode());
            olHomeProductResponse.setNameCategory(product.getCategory().getName());
            olHomeProductResponse.setNameMaterial(product.getMaterial().getName());
            olHomeProductResponse.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());

            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
            String firstName = !images.isEmpty() ? images.get(0).getPath() : null;
            olHomeProductResponse.setPath(firstName);

            olHomeProductResponseList.add(olHomeProductResponse);
        }

        return new PageImpl<>(olHomeProductResponseList, pageable, productList.getTotalElements());
    }
    @Override
    public List<OlHomeProductResponse> getAllOlProductsRespone() {
        List<OlHomeProductResponse> olHomeProductResponseList = new ArrayList<>();
        List<Product> productList = olProductRepository.findAll();

        for (Product product : productList) {
            List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);

            OlHomeProductResponse olHomeProductResponse = new OlHomeProductResponse();
            olHomeProductResponse.setId(product.getId());
            olHomeProductResponse.setName(product.getName());
            olHomeProductResponse.setCode(product.getCode());
            olHomeProductResponse.setNameCategory(product.getCategory().getName());
            olHomeProductResponse.setNameMaterial(product.getMaterial().getName());
            olHomeProductResponse.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());

            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
            String firstName = !images.isEmpty() ? images.get(0).getPath() : null;
            olHomeProductResponse.setPath(firstName);

            olHomeProductResponseList.add(olHomeProductResponse);
        }

        return olHomeProductResponseList;
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
            List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);

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
            olViewProductDetailRespone.setRate(getAverageRateSold(product));

//            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
//            olDetailProductRespone.setImages(images);

            return olViewProductDetailRespone;
        }
        return null;
    }

    private OlHomeProductResponse createOlHomeProductResponse(Product product, BigDecimal price,int totalQuantitySold,Float totalRateSold) {
        OlHomeProductResponse olHomeProductResponse = new OlHomeProductResponse();
        olHomeProductResponse.setId(product.getId());
        olHomeProductResponse.setName(product.getName());
        olHomeProductResponse.setCode(product.getCode());
        olHomeProductResponse.setNameCategory(product.getCategory().getName());
        olHomeProductResponse.setNameMaterial(product.getMaterial().getName());
        olHomeProductResponse.setTotalQuantity(totalQuantitySold);
        olHomeProductResponse.setRate(totalRateSold);

        if (price != null){
            olHomeProductResponse.setPrice(price);
        }
        List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);
        olHomeProductResponse.setPrice(productDetails.isEmpty() ? null : productDetails.get(0).getPrice());

        List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
        String firstName = !images.isEmpty() ? images.get(0).getPath() : null;
        olHomeProductResponse.setPath(firstName);
        return olHomeProductResponse;
    }

    // Sắp xếp mới nhất
    public Page<OlHomeProductResponse> findProductsByFiltersSortedByNewest(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page) {
        Pageable pageable = PageRequest.of(page, 9, Sort.by("createdAt").descending());
        Page<Product> productList = olProductRepository.findProductsBySizesAndColorsAndCategoriesAndMaterials(sizes, colors, categories, materials, pageable);

        return productList.map(product -> createOlHomeProductResponse(product, getProductPrice(product),getTotalQuantitySold(product),getAverageRateSold(product)));
    }
    // Sắp xếp từ thấp đến cao

    @Override
    public Page<OlHomeProductResponse> findProductsByFiltersSortedByPriceAscending(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page) {
        Pageable pageable = PageRequest.of(page, 9);

        Page<Product> productList = olProductRepository.findProductsByFiltersSortedByPriceAscending(sizes, colors, categories, materials, pageable);
        return productList.map(product -> createOlHomeProductResponse(product, getProductPrice(product),getTotalQuantitySold(product),getAverageRateSold(product)));

    }
    // Sắp xếp từ cao xuống thấp

    @Override
    public Page<OlHomeProductResponse> findProductsOrderedByAveragePriceDescending(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials,  Integer page) {
        Pageable pageable = PageRequest.of(page, 9);

        Page<Product> productList = olProductRepository.findProductsOrderedByAveragePriceDescending(sizes, colors, categories, materials, pageable);
        return productList.map(product -> createOlHomeProductResponse(product, getProductPrice(product),getTotalQuantitySold(product),getAverageRateSold(product)));

    }

    @Override
    public Page<OlHomeProductResponse> findProductsByFiltersOrderedByTotalQuantitySold(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials,   Integer page) {
        Pageable pageable = PageRequest.of(page, 9);

        Page<Product> productList = olProductRepository.findProductsByFiltersOrderedByTotalQuantitySold(sizes, colors, categories, materials, pageable);
        return productList.map(product -> createOlHomeProductResponse(product, getProductPrice(product),getTotalQuantitySold(product),getAverageRateSold(product)));

    }



    private BigDecimal getProductPrice(Product product) {
        List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);
        return productDetails.isEmpty() ? null : productDetails.get(0).getPrice();
    }
//    public Page<OlHomeProductResponse> createPagedOlHomeProductResponse(List<OlHomeProductResponse> olHomeProductResponses, int page, int pageSize) {
//        int totalSize = olHomeProductResponses.size();
//        System.out.println("Total size: " + totalSize);
//
//        int start = Math.min((page - 1) * pageSize, totalSize);
//        int end = Math.min(start + pageSize, totalSize);
//
//        List<OlHomeProductResponse> pageContent = olHomeProductResponses.subList(start, end);
//
//        System.out.println("Products in page " + page + ":");
//        for (OlHomeProductResponse product : pageContent) {
//            System.out.println("Product ID: " + product.getId());
//            // In các thông tin khác của sản phẩm nếu cần
//        }
//
//        Pageable pageable = PageRequest.of(page - 1, pageSize);
//        return new PageImpl<>(pageContent, pageable, totalSize);
//    }






//    public Page<OlHomeProductResponse> findProductsByFiltersSortedByPriceDescending(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page) {
//        Pageable pageable = PageRequest.of(page, 9);
//        Page<Product> productList = olProductRepository.findProductsBySizesAndColorsAndCategoriesAndMaterials(sizes, colors, categories, materials, pageable);
//
//        List<OlHomeProductResponse> olHomeProductResponses = productList.getContent().stream()
//                .map(product -> createOlHomeProductResponse(product, getProductPrice(product),getTotalQuantitySold(product),getAverageRateSold(product)))
//                .collect(Collectors.toList());
//
//        olHomeProductResponses.sort(Comparator.comparing(OlHomeProductResponse::getPrice).reversed());
//
//        int start = Math.min((int) pageable.getOffset(), olHomeProductResponses.size());
//        int end = Math.min((start + pageable.getPageSize()), olHomeProductResponses.size());
//
//        return new PageImpl<>(olHomeProductResponses.subList(start, end), pageable, olHomeProductResponses.size());
//    }

    private int getTotalQuantitySold(Product product) {
        List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);
        int totalQuantity = 0;
        for (ProductDetail detail : productDetails) {
            List<BillDetail> billDetails = billDetailService.findByProductDetail(detail);
            for (BillDetail billDetail : billDetails) {
                totalQuantity += billDetail.getQuantity();
            }
        }
        return totalQuantity;
    }
    private float getAverageRateSold(Product product) {
        List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);
        float totalQuantity = 0;
        int count = 0;

        for (ProductDetail detail : productDetails) {
            List<RatingEntity> ratingEntities = olRatingService.findByProductDetail(detail);
            for (RatingEntity billDetail : ratingEntities) {
                totalQuantity += billDetail.getRate();
                count++;
            }
        }
        if (count > 0) {
            return totalQuantity / count;
        } else {
            return 0;
        }
    }


    // Sắp xếp bán chạy
    public Page<OlHomeProductResponse> findBestSellingProducts(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page) {
        Pageable pageable = PageRequest.of(page, 9);
        Page<Product> productList = olProductRepository.findProductsBySizesAndColorsAndCategoriesAndMaterials(sizes, colors, categories, materials, pageable);

        List<OlHomeProductResponse> bestSellingProducts = productList.getContent().stream()
                .map(product -> {
                    BigDecimal price = getProductPrice(product);
                    int totalQuantity = getTotalQuantitySold(product);
                    return createOlHomeProductResponse(product, price, totalQuantity,getAverageRateSold(product));
                })
                .sorted(Comparator.comparingInt(OlHomeProductResponse::getTotalQuantity).reversed())
                .collect(Collectors.toList());

        int start = Math.min((int) pageable.getOffset(), bestSellingProducts.size());
        int end = Math.min((start + pageable.getPageSize()), bestSellingProducts.size());

        return new PageImpl<>(bestSellingProducts.subList(start, end), pageable, bestSellingProducts.size());
    }

    // Sắp xếp Bthg
//    @Override
//    public Page<OlHomeProductResponse> findProductsByFilters(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page) {
//        Pageable pageable = PageRequest.of(page, 9);
//        Page<Product> productList = olProductRepository.findProductsBySizesAndColorsAndCategoriesAndMaterials(sizes, colors, categories, materials, pageable);
//
//        return productList.map(product -> createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product),getAverageRateSold(product)));
//    }

    @Override
    public List<OlHomeProductResponse> findByKeyword(String keyword) {
        List<Product> productList = olProductRepository.findByKeyword(keyword);
        List<OlHomeProductResponse> homeProductResponses = new ArrayList<>();

        for (Product product : productList) {
            BigDecimal price = getProductPrice(product);
            int totalQuantitySold = getTotalQuantitySold(product);
            float totalRateSold = getAverageRateSold(product);

            OlHomeProductResponse homeProductResponse = createOlHomeProductResponse(product, price, totalQuantitySold, totalRateSold);
            homeProductResponses.add(homeProductResponse);
        }

        return homeProductResponses;
    }


}
