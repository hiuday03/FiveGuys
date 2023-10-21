package com.example.demo.service;

import com.example.demo.entity.Roles;

import java.util.List;

public interface RoleService {
    List<Roles> getAll();

    Roles save(Roles roles);

    void delete(Long id);

    Roles update(Long id, Roles roles);
}
