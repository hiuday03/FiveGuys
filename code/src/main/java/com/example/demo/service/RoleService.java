package com.example.demo.service;

import com.example.demo.entity.Roles;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    List<Roles> getAll();

    Roles save(Roles roles);

    void delete(Long id);

    Roles update(Long id, Roles roles);

    Optional<Roles> findByFullNameAndStatus(String fullName,int status);

}
