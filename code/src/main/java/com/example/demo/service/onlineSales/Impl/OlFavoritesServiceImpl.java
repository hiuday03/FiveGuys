package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.repository.onlineSales.OLAddressRepository;
import com.example.demo.repository.onlineSales.OLFavoritesRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
                    favoritesResponse.setProductDetail(favoriteEntity.getProductDetail());
                    favoritesResponse.setCreatedAt(favoriteEntity.getCreatedAt());
                    favoritesResponse.setUpdatedAt(favoriteEntity.getUpdatedAt());
                    favoritesResponse.setStatus(favoriteEntity.getStatus());

                    Long idProductDetail = favoriteEntity.getProductDetail().getId();
                    List<Image> images = olImageService.findByProductDetailId(idProductDetail);
                    if (!images.isEmpty()) {
                        favoritesResponse.setPath(images.get(0).getPath());
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
    public boolean addFavorite(FavoriteEntity favoriteEntity) {
        favoriteEntity.setCreatedAt(new Date());
        olFavoritesRepository.save(favoriteEntity);
        return true;
    }


}
