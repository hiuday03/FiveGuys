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
    public AddressEntity getAddressById(Long id) {
        return addressRepository.findById(id).orElse(null);
    }

    @Override
    public Page<AddressEntity> getAllAddressPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return addressRepository.findAll(pageable);
    }

    @Override
    public AddressEntity createAddress(AddressEntity addressEntity) {
        return addressRepository.save(addressEntity);
    }

    @Override
    public AddressEntity updateAddress(AddressEntity addressEntity, Long id) {
        Optional<AddressEntity> existingAddress = addressRepository.findById(id);
        if (existingAddress.isPresent()) {
            AddressEntity address = existingAddress.get();
            address.setName(addressEntity.getName());
            address.setPhoneNumber(addressEntity.getPhoneNumber());
            address.setAddress(addressEntity.getAddress());
            address.setAddressType(addressEntity.getAddressType());
            address.setCustomer(addressEntity.getCustomer());
            address.setCreatedAt(addressEntity.getCreatedAt());
            address.setUpdatedAt(addressEntity.getUpdatedAt());
            address.setStatus(addressEntity.getStatus());

            return addressRepository.save(address); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
//            return null;
        }
    }

    @Override
    public void deleteAddress(Long id) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Địa chỉ với ID " + id);
        }
    }
}
