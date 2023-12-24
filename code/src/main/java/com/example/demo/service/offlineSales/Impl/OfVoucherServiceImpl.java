package com.example.demo.service.offlineSales.Impl;

import com.example.demo.entity.Vouchers;
import com.example.demo.repository.offlineSales.OfVoucherRepository;
import com.example.demo.service.offlineSales.OfVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OfVoucherServiceImpl implements OfVoucherService {
    @Autowired
    private OfVoucherRepository repository;
    @Override
    public List<Vouchers> getAllVoucherByStatus() {
        return repository.getAllVoucherByStatus();
    }

    @Override
    public Vouchers update(Long id, Vouchers vouchers) {
        Optional<Vouchers> voucherOptional = repository.findById(id);
        if(voucherOptional.isPresent()){
            long startdate = vouchers.getStartDate().getTime();
            long enddate = vouchers.getEndDate().getTime();
            long newDate = new Date().getTime();
            int qty = vouchers.getQuantity() - 1;
            Vouchers vouchers1 = voucherOptional.get();
            vouchers1.setQuantity(qty);
            if(enddate < newDate ){
                vouchers1.setStatus(3);
            }
            else if(startdate > newDate){
                vouchers1.setStatus(0);
            }
            else if(startdate < newDate && enddate > newDate){
                vouchers1.setStatus(1);
            } else if (qty == 0) {
                vouchers1.setStatus(2);
            }
            return repository.save(vouchers1);
        }   else {
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
        }
    }
}
