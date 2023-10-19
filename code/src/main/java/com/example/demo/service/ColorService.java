package com.example.demo.service;

import com.example.demo.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ColorService {

    List<Color> getAll();

    Page<Color> getAll(Integer page);

    Color getById(Long id);

    Color save(Color color);

    Color update(Color color, Long id);

    void delete(Long id);
}
