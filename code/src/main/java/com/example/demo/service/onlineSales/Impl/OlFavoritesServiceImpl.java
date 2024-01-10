package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlFavoritesAddResponse;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.repository.onlineSales.OLAddressRepository;
import com.example.demo.repository.onlineSales.OLFavoritesRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service

public class OlFavoritesServiceImpl implements OlFavoritesService {

//    @Autowired
//    private OLAddressRepository repository;

    @Autowired
    private OLFavoritesRepository olFavoritesRepository;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private OlImageService olImageService;

    @Autowired
    private OLProductService olProductService;

    @Autowired
    private OLProductDetailService olProductDetailService;

//    @Override
//    public List<AddressEntity> getAddressListByUsername(String username) {
//        Optional<AccountEntity> account = olAccountService.findByAccount(username);
//
//        if (account.isPresent()) {
//            // Lấy thông tin khách hàng từ tài khoản
//            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
//            if (customerEntity.isPresent()) {
//                return repository.findAllByCustomer_IdAndStatus(customerEntity.get().getId(),1);
//            }
//        }
//        return Collections.emptyList(); // Trả về danh sách trống nếu không tìm thấy thông tin khách hàng hoặc địa chỉ
//    }
//
//    @Override
//    public void deleteAddress(Long id) {
//        repository.deleteById(id);
//
//    }
//
//    @Override
//    public boolean update(AddressEntity addressRequest) {
//        if (addressRequest.getDefaultAddress()) {
//            // Lấy danh sách địa chỉ của khách hàng
//            List<AddressEntity> customerAddresses = repository.findAllByCustomer_IdAndStatus(addressRequest.getCustomer().getId(),1);
//            for (AddressEntity address : customerAddresses) {
//                if (!address.getId().equals(addressRequest.getId())) {
//                    address.setDefaultAddress(false);
//                    repository.save(address);
//                }
//            }
//        }
//
//        addressRequest.setUpdatedAt(new Date());
//        repository.save(addressRequest);
//        return true;
//    }
//
//    @Override
//    public boolean addAddress(AddressEntity addressRequest) {
//        if (addressRequest.getDefaultAddress()) {
//            // Lấy danh sách địa chỉ của khách hàng
//            List<AddressEntity> customerAddresses = repository.findAllByCustomer_IdAndStatus(addressRequest.getCustomer().getId(),1);
//            for (AddressEntity address : customerAddresses) {
//                if (!address.getId().equals(addressRequest.getId())) {
//                    address.setDefaultAddress(false);
//                    repository.save(address);
//                }
//            }
//        }
//        addressRequest.setCreatedAt(new Date());
//        addressRequest.setStatus(1);
//        addressRequest.setId(null);
//        repository.save(addressRequest);
//        return true;
//    }


    @Override
    public List<OlFavoritesResponse> getFavoriteListByUsername(String username) {
        Optional<AccountEntity> account = olAccountService.findByAccount(username);
        List<OlFavoritesResponse> favoritesResponses = new ArrayList<>();

        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customerEntity.isPresent()) {
                List<FavoriteEntity> favoriteEntities = olFavoritesRepository.findAllByCustomer_IdAndStatus(customerEntity.get().getId(), 1);

                for (FavoriteEntity favoriteEntity : favoriteEntities) {
                    OlFavoritesResponse favoritesResponse = new OlFavoritesResponse();
                    favoritesResponse.setId(favoriteEntity.getId());
                    favoritesResponse.setCustomer(favoriteEntity.getCustomer());
                    favoritesResponse.setProduct(favoriteEntity.getProduct());
                    favoritesResponse.setCreatedAt(favoriteEntity.getCreatedAt());
                    favoritesResponse.setUpdatedAt(favoriteEntity.getUpdatedAt());
                    favoritesResponse.setStatus(favoriteEntity.getStatus());

                    List<ProductDetail> productDetailList = olProductDetailService.findByProduct(favoriteEntity.getProduct());
                    String imagePath = null;
                    for (ProductDetail productDetail : productDetailList) {
                        List<Image> images = olImageService.findByProductDetailId(productDetail.getId());
                        if (!images.isEmpty()) {
                            String currentPath = images.get(0).getPath();
                            if (currentPath != null) {
                                imagePath = currentPath;
                                break; // Kết thúc vòng lặp nếu đã tìm thấy ảnh không null
                            }
                        }
                    }

                    if (imagePath != null) {
                        favoritesResponse.setPath(imagePath);
                    }


                    BigDecimal price = null;

                    for (ProductDetail productDetail : productDetailList) {
                        if (productDetail.getPrice() != null) {
                            price = productDetail.getPrice();
                            break; // Kết thúc vòng lặp nếu đã tìm thấy giá không null
                        }
                    }

                    if (price != null) {
                        favoritesResponse.setPrice(price);
                    }

                    favoritesResponses.add(favoritesResponse);
                }
            }
        }
        return favoritesResponses;
    }



    @Override
    public void deleteFavorite(Long id) {
        olFavoritesRepository.deleteById(id);
    }


    @Override
    public Integer addFavorite(OlFavoritesAddResponse favoriteEntity) {
        FavoriteEntity favoriteEntity1 = new FavoriteEntity();

        Long idProduct = favoriteEntity.getIdProduct();

        // Kiểm tra xem idProduct đã tồn tại trong cơ sở dữ liệu chưa
        Optional<Product> product = olProductService.findById(idProduct);
        if (product.isPresent()) {
            // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích của khách hàng chưa
            CustomerEntity customer = favoriteEntity.getCustomer();
            boolean isProductAlreadyInFavorites = olFavoritesRepository.existsByCustomerAndProduct(customer, product.get());

            if (!isProductAlreadyInFavorites) {
                favoriteEntity1.setProduct(product.get());
                favoriteEntity1.setCustomer(customer);
                favoriteEntity1.setCreatedAt(new Date());
                favoriteEntity1.setStatus(favoriteEntity.getStatus());

                olFavoritesRepository.save(favoriteEntity1);
                return 1; // Trả về 1 nếu thành công
            } else {
                return 2; // Trả về 2 nếu sản phẩm đã tồn tại trong danh sách yêu thích của khách hàng
            }
        }
        return 0; // Trả về 0 nếu idProduct không tồn tại trong cơ sở dữ liệu
    }





}
