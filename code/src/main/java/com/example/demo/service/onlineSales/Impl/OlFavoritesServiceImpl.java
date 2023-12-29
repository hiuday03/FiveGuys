package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.FavoriteEntity;
import com.example.demo.repository.onlineSales.OLAddressRepository;
import com.example.demo.repository.onlineSales.OLFavoritesRepository;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlAddressService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlFavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    public List<FavoriteEntity> getFavoriteListByUsername(String username) {
        Optional<AccountEntity> account = olAccountService.findByAccount(username);

        if (account.isPresent()) {
            // Lấy thông tin khách hàng từ tài khoản
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customerEntity.isPresent()) {
                return olFavoritesRepository.findAllByCustomer_IdAndStatus(customerEntity.get().getId(),1);
            }
        }
        return Collections.emptyList(); // Trả về danh sách trống nếu không tìm thấy thông tin khách hàng hoặc địa chỉ
    }


    @Override
    public void deleteFavorite(Long id) {
        olFavoritesRepository.deleteById(id);
    }


    @Override
    public boolean addFavorite(FavoriteEntity favoriteEntity) {
        olFavoritesRepository.save(favoriteEntity);
        return false;
    }
}
