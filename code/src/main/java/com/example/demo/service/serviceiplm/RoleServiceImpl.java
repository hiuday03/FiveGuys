package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Employees;
import com.example.demo.entity.Roles;
import com.example.demo.repository.RoleRepository;
import com.example.demo.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.file.OpenOption;
import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<Roles> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Roles save(Roles roles) {
        return roleRepository.save(roles);
    }

    @Override
    public void delete(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Roles update(Long id, Roles roles) {
        Optional<Roles> rolesOptional = roleRepository.findById(id);
        if (rolesOptional.isPresent()) {
            Roles roles1 = rolesOptional.get();
            roles1.setFullName(roles.getFullName());
            roles1.setCreatedAt(roles.getCreatedAt());
            roles1.setUpdatedAt(roles.getUpdatedAt());
            roles1.setStatus(roles.getStatus());

            return roleRepository.save(roles1);
        } else {
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
        }
    }

    @Override
    public Optional<Roles> findByFullNameAndStatus(String fullName, int status) {
        Optional<Roles> roles = roleRepository.findByFullNameAndStatus(fullName, 1);
        if (roles.isPresent()) {
            return roles;
        }
        return Optional.empty();
    }
}
