package com.example.demo.service.serviceiplm;

import com.example.demo.entity.BillDetail;
import com.example.demo.repository.BillDetailRepository;
import com.example.demo.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Override
    public List<BillDetail> getAllBillDetail() {
        return billDetailRepository.findAll();
    }

    @Override
    public BillDetail getBillDetailById(Long id) {
        return billDetailRepository.findById(id).orElse(null);
    }

    @Override
    public Page<BillDetail> getAllBillDetailPage(Integer page) {
        Pageable pageable = PageRequest.of(page,1);
        return billDetailRepository.findAll(pageable);
    }

    @Override
    public BillDetail createBillDetail(BillDetail billDetail) {
        return createBillDetail(billDetail);
    }

    @Override
    public BillDetail updateBillDetail(BillDetail billDetail, Long id) {
        Optional<BillDetail> existingBillDetail = billDetailRepository.findById(id);
        if (existingBillDetail.isPresent()){
            BillDetail billDetail1 = existingBillDetail.get();
            billDetail1.setQuantity(billDetail.getQuantity());
            billDetail1.setPrice(billDetail.getPrice());
            billDetail1.setBill(billDetail.getBill());
            billDetail1.setProductDetail(billDetail.getProductDetail());
            billDetail1.setStatus(billDetail.getStatus());
            return billDetailRepository.save(billDetail);
        }else {
            throw  new IllegalArgumentException("Khoong tìm thấy Hoá đơn chi tiết với ID " + id);
        }
    }

    @Override
    public void deleteBillDetail(Long id) {
        if (billDetailRepository.existsById(id)){
            billDetailRepository.existsById(id);
        }else {
            throw  new IllegalArgumentException("Khoong tìm thấy Hoá đơn chi tiết với ID " + id);
        }
    }

    @Override
    public List<BillDetail> getAllByBillId(Long id) {
        return billDetailRepository.findAllByBillId(id);
    }
}
