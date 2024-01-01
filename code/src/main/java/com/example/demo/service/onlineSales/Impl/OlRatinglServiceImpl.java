package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLRatingRepository;
import com.example.demo.service.onlineSales.OlAccountService;
import com.example.demo.service.onlineSales.OlBillDetailService;
import com.example.demo.service.onlineSales.OlCustomerService;
import com.example.demo.service.onlineSales.OlRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OlRatinglServiceImpl implements OlRatingService {


    @Autowired
    private OLRatingRepository olRatingRepository;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private OlAccountService olAccountService;

    @Override
    public List<RatingEntity> findByProductDetail(ProductDetail productDetail) {
        return olRatingRepository.findByProductDetailAndStatus(productDetail,1);
    }

    @Override
    public List<RatingEntity> getRatingListByUsername( String username) {
        Optional<AccountEntity> account = olAccountService.findByAccount(username);

        if (account.isPresent()) {
            Optional<CustomerEntity> customerEntity = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customerEntity.isPresent()) {
                List<RatingEntity> ratingEntities = olRatingRepository.findAllByCustomer_Id(customerEntity.get().getId());
            return ratingEntities;

            }
        }
        return null;

    }

    @Override
    public void deleteRating(Long id) {
        olRatingRepository.deleteById(id);
    }

    @Override
    public boolean addRating(RatingEntity ratingEntity) {
        olRatingRepository.save(ratingEntity);
        return true;
    }
}