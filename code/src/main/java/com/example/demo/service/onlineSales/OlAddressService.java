package com.example.demo.service.onlineSales;


import com.example.demo.entity.AddressEntity;

import java.util.List;
import java.util.Optional;

public interface OlAddressService {

   List<AddressEntity> getAddressListByUsername(String username);

   void deleteAddress(Long id);

    boolean update(AddressEntity userInfoRequest);

    boolean addAddress(AddressEntity addressRequest);

    AddressEntity findByDefaultAddressTrue();

    Optional<AddressEntity> findById(Long id);
}
