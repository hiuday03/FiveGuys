package com.example.demo.service;

import com.example.demo.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ImageService {

    List<Image> getAll();

    Page<Image> getAll(Integer page);

    Image getById(Long id);

    Image save(Image image);

    Image update(Image image, Long id);

    void delete(Long id);
}
