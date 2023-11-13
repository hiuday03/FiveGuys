package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.CartDetail;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.repository.onlineSales.OLCartDetailRepository;
import com.example.demo.repository.onlineSales.OlAccountRepository;
import com.example.demo.service.onlineSales.OlCartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OlCartDetailServiceImpl implements OlCartDetailService {

    @Autowired
    private OLCartDetailRepository olCartDetailRepository;

    @Override
    public List<CartDetail> findAllByCart_Id(Long Id) {
        return olCartDetailRepository.findAllByCart_Id(Id);
    }

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return olCartDetailRepository.save(cartDetail);
    }




    @Override
    public Optional<CartDetail> findById(Long Id) {
        Optional<CartDetail> cartDetail = olCartDetailRepository.findById(Id);

        if (cartDetail.isPresent()){
            return cartDetail;
        }

        return Optional.empty();
    }

    @Override
    public void deleteById(Long id) {
        olCartDetailRepository.deleteById(id);
    }

    @Override
    public void deleteAllByCart_Id(Long idGioHang) {
        olCartDetailRepository.deleteAllByCart_Id(idGioHang);
    }


}
