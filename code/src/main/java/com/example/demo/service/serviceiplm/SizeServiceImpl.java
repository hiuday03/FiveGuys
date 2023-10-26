package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Size;
import com.example.demo.repository.SizeRepository;
import com.example.demo.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    SizeRepository sizeRepository;

    @Override
    public List<Size> getAll() {
        return sizeRepository.findAll();
    }

    @Override
    public Page<Size> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return sizeRepository.findAll(pageable);
    }

    @Override
    public Size getById(Long id) {
        return sizeRepository.findById(id).orElse(null);
    }

    @Override
    public Size save(Size sizeReq) {
        return sizeRepository.save(sizeReq);
    }

    @Override
    public Size update(Size sizeReq, Long id) {
        Optional<Size> sizeOptional = sizeRepository.findById(id);
        if(sizeOptional.isPresent()){
            Size size = sizeOptional.get();
            size.setName(sizeReq.getName());
            size.setUpdatedAt(sizeReq.getUpdatedAt());
            size.setStatus(sizeReq.getStatus());

            return sizeRepository.save(size);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        if(sizeRepository.existsById(id)){
            sizeRepository.deleteById(id);
        }
    }
}
