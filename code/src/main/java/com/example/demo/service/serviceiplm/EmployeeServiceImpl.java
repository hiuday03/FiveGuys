package com.example.demo.service.serviceiplm;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    // get all Employee
    @Override
    public List<Employees> getAll(){
        return employeeRepository.findAll();
    }

    //get all Employ status = 1 (dang làm)
    @Override
    public List<Employees> getAllStatusDangLam(){
        return employeeRepository.getAllStatusDangLam();
    }

    @Override
    public Employees getById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Employees> phanTrang(Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        return employeeRepository.findAll(pageable);
    }

    @Override
    public List<Employees> getAllStatus(Integer status){
        return employeeRepository.getAllStatus(status);
    }

    @Override
    public Employees create(Employees employees){
//        List<Employees> hi = new ArrayList<>();
        Employees employees1 = new Employees();
        String randomCode = generateRandomCode(6);
        employees1.setCode(randomCode);
        employees1.setFullName(employees.getFullName());
        employees1.setAvatar(employees.getAvatar());
        employees1.setBirthDate(employees.getBirthDate());
        employees1.setGender(employees.getGender());
        employees1.setAddress(employees.getAddress());
        employees1.setAccount(employees.getAccount());
        employees1.setCreatedAt(new Date());
        employees1.setUpdatedAt(new Date());
        employees1.setCreatedBy("admin");
        employees1.setUpdatedBy("admin");
        employees1.setStatus(1);

        return employeeRepository.save(employees1);

    }

    @Override
    public void delete(Long id){
         employeeRepository.deleteById(id);
    }

    @Override
    public  Employees update(Long id, Employees employees){
        Optional<Employees> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            Employees employees1 = existingEmployee.get();
            employees1.setCode(employees.getCode());
            employees1.setFullName(employees.getFullName());
            employees1.setAvatar(employees.getAvatar());
            employees1.setBirthDate(employees.getBirthDate());
            employees1.setGender(employees.getGender());
            employees1.setAddress(employees.getAddress());
            employees1.setAccount(employees.getAccount());
            employees1.setCreatedAt(employees.getCreatedAt());
            employees1.setUpdatedAt(new Date());
            employees1.setCreatedBy("admin");
            employees1.setUpdatedBy("admin");
            employees1.setStatus(employees.getStatus());

            return employeeRepository.save(employees1); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
//            return null;
        }
    }

    private String generateRandomCode(int length) {
        String uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder randomCode = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(uppercaseCharacters.length());
            char randomChar = uppercaseCharacters.charAt(randomIndex);
            randomCode.append(randomChar);
        }

        return randomCode.toString();
    }

    //delete theo status
    @Override
    public  Employees updateRole(Long id, Employees employees){
        Optional<Employees> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            Employees employees1 = existingEmployee.get();
            employees1.setCode(employees.getCode());
            employees1.setFullName(employees.getFullName());
            employees1.setAvatar(employees.getAvatar());
            employees1.setBirthDate(employees.getBirthDate());
            employees1.setGender(employees.getGender());
            employees1.setAddress(employees.getAddress());
            employees1.setAccount(employees.getAccount());
            employees1.setCreatedAt(employees.getCreatedAt());
            employees1.setUpdatedAt(new Date());
            employees1.setCreatedBy("admin");
            employees1.setUpdatedBy("admin");
            employees1.setStatus(2);

            return employeeRepository.save(employees1); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Employee với ID " + id);
//            return null;
        }
    }

    // search ma
    @Override
    public Page<Employees>  searchMa(String ma, Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Employees> employeesList = employeeRepository.searchMa(ma, pageable);
        return employeesList;
    }

}
