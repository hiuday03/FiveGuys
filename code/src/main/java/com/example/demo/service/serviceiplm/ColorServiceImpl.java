package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Color;
import com.example.demo.repository.ColorRepository;
import com.example.demo.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    ColorRepository colorRepository;

    @Override
    public List<Color> getAll() {
        return colorRepository.findAll();
    }

    @Override
    public Page<Color> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return colorRepository.findAll(pageable);
    }

    @Override
    public Color getById(Long id) {
        return colorRepository.findById(id).orElse(null);
    }

    @Override
    public Color save(Color colorReq) {
        return colorRepository.save(colorReq);
    }

    @Override
    public Color update(Color colorReq, Long id) {
        Optional<Color> colorOptional = colorRepository.findById(id);
        if(colorOptional.isPresent()){
            Color color = colorOptional.get();
            color.setName(colorReq.getName());
            color.setColorCode(colorReq.getColorCode());
            color.setUpdatedAt(colorReq.getUpdatedAt());
            color.setStatus(colorReq.getStatus());

            return colorRepository.save(color);
        }
        return null;
    }

    @Override
    public Color updateStatus(Long id) {
        Optional<Color> colorOptional = colorRepository.findById(id);
        if(colorOptional.isPresent()){
            Color color = colorOptional.get();
            color.setStatus(3);

            return colorRepository.save(color);
        }
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
