package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AddressEntity;
import com.example.demo.repository.AddressRepository;
import com.example.demo.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }


    @Override
    public List<AddressEntity> getAllAddress() {
        return addressRepository.findAll();
    }

    @Override
    public AddressEntity getAddressById(Long addressId) {
        return addressRepository.findById(addressId).orElse(null);
    }

    @Override
    public Page<AddressEntity> getAllAddressPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return addressRepository.findAll(pageable);
    }

    @Override
    public List<AddressEntity> getAddressesByCustomerId(Long customerId) {
        return addressRepository.findByCustomerId(customerId);
    }

    @Override
    public AddressEntity createAddress(AddressEntity addressEntity) {
        return addressRepository.save(addressEntity);
    }

    @Override
    public AddressEntity updateAddress(AddressEntity addressEntity, Long addressId) {
        Optional<AddressEntity> existingCustomer = addressRepository.findById(addressId);
        if (existingCustomer.isPresent()) {
            AddressEntity address = existingCustomer.get();
            address.setName(addressEntity.getName());
            address.setPhoneNumber(addressEntity.getPhoneNumber());
            address.setAddress(addressEntity.getAddress());
            address.setAddressType(addressEntity.getAddressType());
            address.setCustomer(addressEntity.getCustomer());
            address.setCreateAt(addressEntity.getCreateAt());
            address.setUpdateAt(addressEntity.getUpdateAt());
            address.setStatus(addressEntity.getStatus());

            return addressRepository.save(address); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + addressId);
//            return null;
        }
    }

    @Override
    public void deleteAddress(Long addressId) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (addressRepository.existsById(addressId)) {
            addressRepository.deleteById(addressId);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + addressId);
        }
    }
}
