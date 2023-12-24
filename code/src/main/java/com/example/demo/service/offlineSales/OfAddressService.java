package com.example.demo.service.offlineSales;

import com.example.demo.entity.AddressEntity;

public interface OfAddressService {
   AddressEntity findByCustomerId(Long customerId);
}
