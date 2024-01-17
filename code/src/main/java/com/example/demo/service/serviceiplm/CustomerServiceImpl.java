package com.example.demo.service.serviceiplm;

import com.example.demo.entity.AddressEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class CustomerServiceImpl implements CustomerService {

//    private final CustomerRepository customerRepository;
//
//    @Autowired
//    public CustomerServiceImpl(CustomerRepository customerRepository) {
//        this.customerRepository = customerRepository;
//    }
@Autowired
private CustomerRepository customerRepository;
    @Override
    public List<CustomerEntity> getAllCustomer() {
        return customerRepository.findAll();
    }

    @Override
    public CustomerEntity getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    @Override
    public Page<CustomerEntity> getAllCustomerPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return customerRepository.findAll(pageable);
    }

    @Override
    public CustomerEntity createCustomer(CustomerEntity customerEntity) {
        CustomerEntity customer = new CustomerEntity();
        customer.setFullName(customerEntity.getFullName());
        customer.setAvatar(customerEntity.getAvatar());
        customer.setBirthDate(customerEntity.getBirthDate());
        customer.setGender(customerEntity.getGender());
        customer.setAccount(customerEntity.getAccount());
        customer.setCreatedAt(new Date());
        customer.setUpdatedAt(new Date());
        customer.setCreatedBy("Admin");
        customer.setUpdatedBy("Admin");
        customer.setStatus(1);
        return customerRepository.save(customer);
    }

    @Override
    public CustomerEntity updateCustomer(CustomerEntity customerEntity, Long id) {
        Optional<CustomerEntity> existingCustomer = customerRepository.findById(id);
        if (existingCustomer.isPresent()) {
            CustomerEntity customer = existingCustomer.get();
            customer.setFullName(customerEntity.getFullName());
            customer.setAvatar(customerEntity.getAvatar());
            customer.setBirthDate(customerEntity.getBirthDate());
            customer.setGender(customer.getGender());
            customer.setAccount(customerEntity.getAccount());
            customer.setCreatedAt(customerEntity.getCreatedAt());
            customer.setUpdatedAt(new Date());
            customer.setCreatedBy("Admin");
            customer.setUpdatedBy("Admin");
            customer.setStatus(customerEntity.getStatus());
            return customerRepository.save(customer); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
//            return null;
        }
    }

    @Override
    public CustomerEntity updateStatusCustomer(Long id, CustomerEntity customerEntity) {
        Optional<CustomerEntity> existingCustomer = customerRepository.findById(id);
        if (existingCustomer.isPresent()) {
            CustomerEntity customer = existingCustomer.get();
            customer.setFullName(customerEntity.getFullName());
            customer.setAvatar(customerEntity.getAvatar());
            customer.setBirthDate(customerEntity.getBirthDate());
            customer.setGender(customer.getGender());
            customer.setAccount(customerEntity.getAccount());
            customer.setCreatedAt(customerEntity.getCreatedAt());
            customer.setUpdatedAt(new Date());
            customer.setCreatedBy("Admin");
            customer.setUpdatedBy("Admin");
            customer.setStatus(2);
            return customerRepository.save(customer); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
//            return null;
        }
    }

    @Override
    public List<CustomerEntity> getSStatus(Integer status) {
        List<CustomerEntity> c = customerRepository.getSStatus(status);
        return c;
    }


    @Override
    public void deleteCustomer(Long id) {
        // Kiểm tra xem khách hàng có tồn tại trước khi xóa
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
        } else {
            // Xử lý lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
        }
    }
}
