package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlFavoritesResponse;
import com.example.demo.model.response.onlineSales.OlRatingResponse;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLRatingRepository;
import com.example.demo.service.onlineSales.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
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

    @Autowired
    private OlBillDetailService olBillDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OlBillDetailService billDetailService;

//    @Override
//    public List<RatingEntity> findByProduct(Product productDetail) {
//        return olRatingRepository.findByBillDetailAndStatus(productDetail,1);
//    }

    @Override
    public List<RatingEntity> findByProduct(Product productDetail) {
        return null;
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
    public boolean addRating(OlRatingResponse ratingEntity) {
        Optional<BillDetail> billDetail = olBillDetailService.findById(ratingEntity.getIdBillDetail());
        Optional<CustomerEntity> customerEntity = olCustomerService.findById(ratingEntity.getIdCustomer());

        if (billDetail.isPresent() && customerEntity.isPresent()) {
                boolean hasRated = olRatingRepository.existsByCustomerAndBillDetail(customerEntity.get(), billDetail.get());

            if (!hasRated) {
                RatingEntity ratingEntity1 = new RatingEntity();
                ratingEntity1.setBillDetail(billDetail.get());
                ratingEntity1.setContent(ratingEntity.getContent());
                ratingEntity1.setCustomer(customerEntity.get());
                ratingEntity1.setCreatedAt(new Date());
                ratingEntity1.setRate(ratingEntity.getRate());
                ratingEntity1.setRated(true);
                ratingEntity1.setStatus(1);
                olRatingRepository.save(ratingEntity1);
                return true;
            }
        }

        return false;
    }

//    @Override
//    public List<RatingEntity> findByProductId(Long productId) {
//        List<ProductDetail> productDetailList = olProductDetailService.findByProduct_Id(productId);
//        List<RatingEntity> list = new ArrayList<>();
//
//        for (ProductDetail productDetail : productDetailList) {
//            List<BillDetail> billDetails = billDetailService.findByProductDetailAndStatus(productDetail.getId(), 1);
//            for (BillDetail billDetail : billDetails) {
//                List<RatingEntity> ratingEntitiesForDetail = olRatingRepository.findByBillDetailAndStatus(billDetail,1);
//                        list.addAll(ratingEntitiesForDetail);
//            }
//        }
//        return list;
//    }


    @Override
    public List<RatingEntity> findByBillDetailAndStatus(BillDetail billDetail,int status) {
        return olRatingRepository.findByBillDetailAndStatus(billDetail , status);
    }

    @Override
    public List<RatingEntity> findByBillDetail_Id(Long idBillDetail) {
        return olRatingRepository.findByBillDetail_Id(idBillDetail);
    }

    @Override
    public Page<RatingEntity> findAllByCustomer_IdOrderByYourFieldDesc(Long customerId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return olRatingRepository.findAllByCustomer_IdOrderByYourFieldDesc(customerId,pageRequest);
    }

    @Override
    public Page<RatingEntity> findByProductId(Long productId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        return olRatingRepository.findByProductId(productId,pageRequest);
    }
}