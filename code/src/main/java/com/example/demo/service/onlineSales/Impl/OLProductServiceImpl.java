package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlViewProductDetailRespone;
import com.example.demo.model.response.onlineSales.OlHomeProductResponse;
import com.example.demo.repository.onlineSales.OLProductRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
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

    @Autowired
    private OlCategoryService olCategoryService;


    @Override
    public List<Product> getAllProducts() {
        return olProductRepository.findAll();
    }

    @Override
    public Product save(Product product) {
        return olProductRepository.save(product);
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
            OlViewProductDetailRespone olViewProductDetailRespone = new OlViewProductDetailRespone();
            olViewProductDetailRespone.setId(product.getId());
            olViewProductDetailRespone.setCode(product.getCode());
            olViewProductDetailRespone.setName(product.getName());
            olViewProductDetailRespone.setWrist(product.getWrist());
            olViewProductDetailRespone.setCollar(product.getCollar());
            olViewProductDetailRespone.setBrand(product.getBrand().getName());
            olViewProductDetailRespone.setDescribe(product.getDescribe());
            olViewProductDetailRespone.setNameCategory(product.getCategory().getName());
            olViewProductDetailRespone.setNameMaterial(product.getMaterial().getName());
            olViewProductDetailRespone.setPrice(getProductPrice(product));
            olViewProductDetailRespone.setRate(getAverageRateSold(product.getId()));
            List<ProductDetail> productDetailList = olProductDetailService.findByProduct(product);
            List<RatingEntity> list = new ArrayList<>();

            for (ProductDetail productDetail : productDetailList) {
                List<BillDetail> billDetails = billDetailService.findByProductDetailAndStatus(productDetail.getId(), 1);
                for (BillDetail billDetail : billDetails) {
                    List<RatingEntity> ratingEntitiesForDetail = olRatingService.findByBillDetailAndStatus(billDetail,2);

                    list.addAll(ratingEntitiesForDetail);
                }

            }
            olViewProductDetailRespone.setTotalQuantity(getTotalQuantitySold(product));
            olViewProductDetailRespone.setTotalRate(list.size());
// ratingEntities bây giờ chứa tất cả các RatingEntity từ tất cả các ProductDetail tương ứng


//            List<Image> images = productDetails.isEmpty() ? new ArrayList<>() : productDetails.get(0).getImages();
//            olDetailProductRespone.setImages(images);

            return olViewProductDetailRespone;
        }
        return null;
    }

    private OlHomeProductResponse createOlHomeProductResponse(Product product, BigDecimal price, int totalQuantitySold, Float totalRateSold) {
        OlHomeProductResponse olHomeProductResponse = new OlHomeProductResponse();
        olHomeProductResponse.setId(product.getId());
        olHomeProductResponse.setName(product.getName());
        olHomeProductResponse.setCode(product.getCode());
        olHomeProductResponse.setNameCategory(product.getCategory().getName());
        olHomeProductResponse.setNameMaterial(product.getMaterial().getName());
        olHomeProductResponse.setTotalQuantity(totalQuantitySold);
        olHomeProductResponse.setRate(totalRateSold);

        if (price != null) {
            olHomeProductResponse.setPrice(price);
        }
        List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);
        String path = null;

        for (ProductDetail productDetail : productDetails) {
            if (productDetail.getStatus() == 1) {
                List<Image> images = productDetail.getImages();

                if (images != null && !images.isEmpty()) {
                    Image firstImageWithNonNullPath = images.stream()
                            .filter(image -> image != null && image.getPath() != null)
                            .findFirst()
                            .orElse(null);

                    if (firstImageWithNonNullPath != null) {
                        path = firstImageWithNonNullPath.getPath();
                        break;
                    }
                }
            }
        }

        olHomeProductResponse.setPath(path);


        return olHomeProductResponse;
    }

    // Sắp xếp mới nhất
    public List<OlHomeProductResponse> findProductsByFiltersSortedByNewest(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials) {
        List<Product> productList = olProductRepository.findProductsBySizesAndColorsAndCategoriesAndMaterials(sizes, colors, categories, materials);

        return productList.stream()
                .map(product -> createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId())))
                .collect(Collectors.toList());
    }

    // Sắp xếp từ thấp đến cao

    @Override
    public List<OlHomeProductResponse> findProductsByFiltersSortedByPriceAscending(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials) {
        List<Product> productList = olProductRepository.findProductsByFiltersSortedByPriceAscending(sizes, colors, categories, materials);
        return productList.stream()
                .map(product -> createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId())))
                .collect(Collectors.toList());
    }

    @Override
    public List<OlHomeProductResponse> findProductsOrderedByAveragePriceDescending(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials) {
        List<Product> productList = olProductRepository.findProductsOrderedByAveragePriceDescending(sizes, colors, categories, materials);
        return productList.stream()
                .map(product -> createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId())))
                .collect(Collectors.toList());
    }

    @Override
    public List<OlHomeProductResponse> findProductsByFiltersOrderedByTotalQuantitySold(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials) {
        List<Product> productList = olProductRepository.findProductsByFiltersOrderedByTotalQuantitySold(sizes, colors, categories, materials);
        return productList.stream()
                .map(product -> createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId())))
                .collect(Collectors.toList());
    }


    private BigDecimal getProductPrice(Product product) {
        List<ProductDetail> productDetails = olProductDetailService.findByProduct(product);
        return productDetails.stream()
                .map(ProductDetail::getPrice)
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);
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
                if (billDetail.getBill().getStatus() == 3){
                    totalQuantity += billDetail.getQuantity();

                }

            }

        }
        return totalQuantity;
    }

    private float getAverageRateSold(Long idProduct) {
        Optional<Product> product = olProductRepository.findById(idProduct);

        if (product.isPresent()) {
            List<ProductDetail> productDetails = olProductDetailService.findByProduct(product.get());
            float totalRate = 0;
            int totalRatings = 0;

            for (ProductDetail productDetail : productDetails) {
                List<BillDetail> billDetails = productDetail.getBillDetails(); // Assuming BillDetail is a list associated with ProductDetail

                for (BillDetail billDetail : billDetails) {
                    List<RatingEntity> ratingEntities = olRatingService.findByBillDetailAndStatus(billDetail,2); // Assuming you have a method to find ratings by BillDetail

                    for (RatingEntity ratingEntity : ratingEntities) {
                        if (ratingEntity.isRated()) {
                            totalRate += ratingEntity.getRate();
                            totalRatings++;
                        }
                    }
                }
            }

            if (totalRatings > 0) {
                return Math.round(totalRate / totalRatings);
            } else {
                return 0;
            }
        }

        return 0;
    }


    // Sắp xếp bán chạy
//    public Page<OlHomeProductResponse> findBestSellingProducts(List<Size> sizes, List<Color> colors, List<Category> categories, List<Material> materials, Integer page) {
//        Pageable pageable = PageRequest.of(page, 9);
//        Page<Product> productList = olProductRepository.findProductsBySizesAndColorsAndCategoriesAndMaterials(sizes, colors, categories, materials, pageable);
//
//        List<OlHomeProductResponse> bestSellingProducts = productList.getContent().stream()
//                .map(product -> {
//                    BigDecimal price = getProductPrice(product);
//                    int totalQuantity = getTotalQuantitySold(product);
//                    return createOlHomeProductResponse(product, price, totalQuantity,getAverageRateSold(product));
//                })
//                .sorted(Comparator.comparingInt(OlHomeProductResponse::getTotalQuantity).reversed())
//                .collect(Collectors.toList());
//
//        int start = Math.min((int) pageable.getOffset(), bestSellingProducts.size());
//        int end = Math.min((start + pageable.getPageSize()), bestSellingProducts.size());
//
//        return new PageImpl<>(bestSellingProducts.subList(start, end), pageable, bestSellingProducts.size());
//    }

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
            float totalRateSold = getAverageRateSold(product.getId());

            OlHomeProductResponse homeProductResponse = createOlHomeProductResponse(product, price, totalQuantitySold, totalRateSold);
            homeProductResponses.add(homeProductResponse);
        }

        return homeProductResponses;
    }


    @Override
    public List<OlHomeProductResponse> findAllProductsOrderedByTotalQuantitySold() {
        List<OlHomeProductResponse> responses = new ArrayList<>();
        List<Product> products = olProductRepository.findAllProductsOrderedByTotalQuantitySold();
        for (Product product : products) {

            OlHomeProductResponse response = createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId()));
            responses.add(response);
        }
        return responses;
    }

    @Override
    public List<OlHomeProductResponse> findProductsOrderedByCreatedAt() {
        List<OlHomeProductResponse> responses = new ArrayList<>();
        List<Product> products = olProductRepository.findProductsOrderedByCreatedAt();
        for (Product product : products) {
            OlHomeProductResponse response = createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId()));
            responses.add(response);
        }
        return responses;
    }

    @Override
    public List<OlHomeProductResponse> findProductsByCategoryId(Long productId) {
        List<OlHomeProductResponse> responses = new ArrayList<>();
        Category category = olCategoryService.findCategoryByProductId(productId);
        List<Product> products = olProductRepository.findProductsByCategory(category);
        for (Product product : products) {
            OlHomeProductResponse response = createOlHomeProductResponse(product, getProductPrice(product), getTotalQuantitySold(product), getAverageRateSold(product.getId()));
            responses.add(response);
        }
        return responses;
    }


}
