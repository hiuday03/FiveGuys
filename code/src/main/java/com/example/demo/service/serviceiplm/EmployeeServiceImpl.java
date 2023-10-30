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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public List<Employees> getAll(){
        return employeeRepository.findAll();
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
    public Employees create(Employees employees){
//        List<Employees> hi = new ArrayList<>();
        Employees employees1 = new Employees();
        employees1.setCode(zenMaHD(employeeRepository.genCode()));
        employees1.setFullName(employees.getFullName());
        employees1.setAvatar(employees.getAvatar());
        employees1.setAccount(employees.getAccount());
        employees1.setPassword("123456789");
        employees1.setPhoneNumber(employees.getPhoneNumber());
        employees1.setEmail(employees.getEmail());
        employees1.setBirthDate(employees.getBirthDate());
        employees1.setGender(employees.getGender());
        employees1.setAddress(employees.getAddress());
        employees1.setRoles(employees.getRoles());
        employees1.setCreatedAt(new Date());
        employees1.setUpdatedAt(new Date());
        employees1.setCreatedBy(employees.getCreatedBy());
        employees1.setUpdatedBy(employees.getUpdatedBy());
        employees1.setStatus(employees.getStatus());

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
            employees1.setAccount(employees.getAccount());
            employees1.setPassword(employees.getPassword());
            employees1.setPhoneNumber(employees.getPhoneNumber());
            employees1.setEmail(employees.getEmail());
            employees1.setBirthDate(employees.getBirthDate());
            employees1.setGender(employees.getGender());
            employees1.setAddress(employees.getAddress());
            employees1.setRoles(employees.getRoles());
            employees1.setCreatedAt(employees.getCreatedAt());
            employees1.setUpdatedAt(new Date());
            employees1.setCreatedBy(employees.getCreatedBy());
            employees1.setUpdatedBy(employees.getUpdatedBy());
            employees1.setStatus(employees.getStatus());

            return employeeRepository.save(employees1); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
//            return null;
        }
    }

    public String zenMaHD(List<Employees> lst) {
        String maNV = "FG000";

        return maNV + (lst.size() + 1);
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
            employees1.setAccount(employees.getAccount());
            employees1.setPassword(employees.getPassword());
            employees1.setPhoneNumber(employees.getPhoneNumber());
            employees1.setEmail(employees.getEmail());
            employees1.setBirthDate(employees.getBirthDate());
            employees1.setGender(employees.getGender());
            employees1.setAddress(employees.getAddress());
            employees1.setRoles(employees.getRoles());
            employees1.setCreatedAt(employees.getCreatedAt());
            employees1.setUpdatedAt(new Date());
            employees1.setCreatedBy(employees.getCreatedBy());
            employees1.setUpdatedBy(employees.getUpdatedBy());
            employees1.setStatus(0);

            return employeeRepository.save(employees1); // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
        } else {
            // Trả về null hoặc thông báo lỗi nếu không tìm thấy khách hàng với ID này
            throw new IllegalArgumentException("Không tìm thấy Employee với ID " + id);
//            return null;
        }
    }

    // search ma
    @Override
    public List<Employees>  searchMa(String ma){
        List<Employees> employeesList = employeeRepository.searchMa(ma);
        return employeesList;
    }

}
