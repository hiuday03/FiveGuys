package com.example.demo.service.offlineSales;

import com.example.demo.entity.Cards;

import java.util.List;

public interface OfCardService {
    List<Cards> getAll();

    Cards save (Cards card);
}
