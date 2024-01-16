package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.repository.onlineSales.OLAddressRepository;
import com.example.demo.repository.onlineSales.OLColorRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class OlAddressServiceImpl implements OlAddressService {

    @Autowired
    private OLAddressRepository repository;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private OlEmployeeService olEmployeeService;

    @Override
    public List<AddressEntity> getAddressListByUsername(String username) {
        Optional<AccountEntity> account = olAccountService.findByAccount(username);

        if (account.isPresent()) {
            // Lấy thông tin khách hàng từ tài khoản
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customerEntity.isPresent()) {
                return repository.findAllByCustomer_IdAndStatus(customerEntity.get().getId(),1);
            }
        }
        return Collections.emptyList(); // Trả về danh sách trống nếu không tìm thấy thông tin khách hàng hoặc địa chỉ
    }

    @Override
    public void deleteAddress(Long id) {
        repository.deleteById(id);

    }

    @Override
    public boolean update(AddressEntity addressRequest) {
        if (addressRequest.getDefaultAddress()) {
            // Lấy danh sách địa chỉ của khách hàng
            List<AddressEntity> customerAddresses = repository.findAllByCustomer_IdAndStatus(addressRequest.getCustomer().getId(),1);
            for (AddressEntity address : customerAddresses) {
                if (!address.getId().equals(addressRequest.getId())) {
                    address.setDefaultAddress(false);
                    repository.save(address);
                }
            }
        }

        addressRequest.setUpdatedAt(new Date());
        repository.save(addressRequest);
        return true;
    }

    @Override
    public boolean addAddress(AddressEntity addressRequest) {
        if (addressRequest.getDefaultAddress()) {
            // Lấy danh sách địa chỉ của khách hàng
            List<AddressEntity> customerAddresses = repository.findAllByCustomer_IdAndStatus(addressRequest.getCustomer().getId(),1);
            for (AddressEntity address : customerAddresses) {
                if (!address.getId().equals(addressRequest.getId())) {
                    address.setDefaultAddress(false);
                    repository.save(address);
                }
            }
        }
        addressRequest.setCreatedAt(new Date());
        addressRequest.setStatus(1);
        addressRequest.setId(null);
        repository.save(addressRequest);
        return true;
    }

    @Override
    public AddressEntity findByDefaultAddressTrue(String username) {
        Optional<AccountEntity> account = olAccountService.findByAccount(username);
        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
//            Optional<Employees> employeeEntity = Optional.ofNullable(olEmployeeService.findByAccount_Id(account.get().getId()));

            if (customerEntity.isPresent()) {
                List<AddressEntity> addressEntities = repository.findByCustomer_FullName(customerEntity.get().getFullName());
                for (AddressEntity addressEntity : addressEntities) {
                    if ((addressEntity.getDefaultAddress())) {
                        return addressEntity;
                    }
                }
            }
        }
        return null;
    }


    @Override
    public Optional<AddressEntity> findById(Long id) {
        Optional<AddressEntity> addressEntity = repository.findById(id);
        if (addressEntity.isPresent()){
            return addressEntity;
        }

        return Optional.empty();
    }


}
