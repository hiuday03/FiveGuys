package com.example.demo.service;

import com.example.demo.entity.AddressEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AddressService {

    List<AddressEntity> getAllAddress();

//    Page<AddressEntity> getAll(Integer page);

    AddressEntity getAddressById(Long id);

    Page<AddressEntity> getAllAddressPage(Integer page);

    AddressEntity createAddress(AddressEntity addressEntity);

    AddressEntity updateAddress(AddressEntity addressEntity, Long id);

    void deleteAddress(Long id);

}
