package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.Cards;
import com.example.demo.repository.offlineSales.OfCardRepositrory;
import com.example.demo.service.offlineSales.OfCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfCardServiceImpl implements OfCardService {
    @Autowired
    private OfCardRepositrory repositrory;
    @Override
    public List<Cards> getAll() {
        return repositrory.findAll();
    }

    @Override
    public Cards save(Cards card) {
        return repositrory.save(card);
    }
}
