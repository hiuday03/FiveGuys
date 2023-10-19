package com.example.demo.service;

import com.example.demo.entity.AddressEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AddressService {

    List<AddressEntity> getAllAddress();

//    Page<AddressEntity> getAll(Integer page);

    AddressEntity getAddressById(Long addressId);

    Page<AddressEntity> getAllAddressPage(Integer page);

    List<AddressEntity> getAddressesByCustomerId(Long customerId);

    AddressEntity createAddress(AddressEntity addressEntity);

    AddressEntity updateAddress(AddressEntity addressEntity, Long addressIdz);

    void deleteAddress(Long addressId);

}
