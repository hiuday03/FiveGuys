package com.example.demo.service.serviceiplm;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<CustomerEntity> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public CustomerEntity getCustomerById(Long customerId) {
        return customerRepository.findById(customerId).orElse(null);
    }

    @Override
    public Page<CustomerEntity> getAllCustomerPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return customerRepository.findAll(pageable);
    }

    @Override
    public CustomerEntity createCustomer(CustomerEntity customerEntity) {
        return customerRepository.save(customerEntity);
    }

    @Override
    public CustomerEntity updateCustomer(CustomerEntity customerEntity, Long customerId) {
        Optional<CustomerEntity> existingCustomer = customerRepository.findById(customerId);
        if (existingCustomer.isPresent()) {
            CustomerEntity customer = existingCustomer.get();
            customer.setFullName(customerEntity.getFullName());
            customer.setAvatar(customerEntity.getAvatar());
            customer.setAccount(customerEntity.getAccount());
            customer.setPassword(customerEntity.getPassword());
            customer.setPhoneNumber(customerEntity.getPhoneNumber());
            customer.setEmail(customerEntity.getEmail());
            customer.setBirthDate(customerEntity.getBirthDate());
            customer.setGender(customer.isGender());
            customer.setAddress(customerEntity.getAddress());
            customer.setCreatedAt(customerEntity.getCreatedAt());
            customer.setUpdatedAt(customerEntity.getUpdatedAt());
            customer.setCreatedBy(customerEntity.getCreatedBy());
            customer.setUpdatedBy(customerEntity.getUpdatedBy());
            customer.setStatus(customerEntity.getStatus());
            return customerRepository.save(customer); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + customerId);
//            return null;
        }
    }

    @Override
    public void deleteCustomer(Long customerId) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (customerRepository.existsById(customerId)) {
            customerRepository.deleteById(customerId);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + customerId);
        }
    }
}
