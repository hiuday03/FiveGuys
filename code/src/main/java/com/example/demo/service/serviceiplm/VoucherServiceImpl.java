package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Roles;
import com.example.demo.entity.Vouchers;
import com.example.demo.repository.VoucherRepository;
import com.example.demo.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    VoucherRepository voucherRepository;

    @Override
    public List<Vouchers> getAll(){
        return voucherRepository.findAll();
    }
    @Override
    public Vouchers save(Vouchers vouchers){
        return voucherRepository.save(vouchers);
    }

    @Override
    public void delete(Long id){
        voucherRepository.deleteById(id);
    }

    @Override
    public Vouchers update(Long id, Vouchers vouchers){
        Optional<Vouchers> voucherOptional = voucherRepository.findById(id);
        if(voucherOptional.isPresent()){
            Vouchers vouchers1 = voucherOptional.get();
            vouchers1.setCode(vouchers.getCode());
            vouchers1.setName(vouchers.getName());
            vouchers1.setValue(vouchers.getValue());
            vouchers1.setMinimumTotalAmount(vouchers.getMinimumTotalAmount());
            vouchers1.setQuantity(vouchers.getQuantity());
            vouchers1.setDescribe(vouchers.getDescribe());
            vouchers1.setStartDate(vouchers.getStartDate());
            vouchers1.setEndDate(vouchers.getEndDate());
            vouchers1.setCreatedAt(vouchers.getCreatedAt());
            vouchers1.setUpdatedAt(vouchers.getUpdatedAt());
            vouchers1.setCrearedBy(vouchers.getCrearedBy());
            vouchers1.setUpdatedBy(vouchers.getUpdatedBy());
            vouchers1.setStatus(Integer.parseInt(vouchers.getStatus()));

            return voucherRepository.save(vouchers1);
        }else {
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
        }
    }
}
