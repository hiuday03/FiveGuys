package com.example.demo.service.onlineSales;


import com.example.demo.entity.AddressEntity;

import java.util.List;

public interface OlAddressService {

   List<AddressEntity> getAddressListByUsername(String username);

   void deleteAddress(Long id);

    boolean update(AddressEntity userInfoRequest);

    boolean addAddress(AddressEntity addressRequest);
}
