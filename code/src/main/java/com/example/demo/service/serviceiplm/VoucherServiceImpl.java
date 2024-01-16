package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Employees;
import com.example.demo.entity.Vouchers;
import com.example.demo.repository.VoucherRepository;
import com.example.demo.service.VoucherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class VoucherServiceImpl implements VoucherService {
    @Autowired
    VoucherRepository voucherRepository;

    @Transactional
    @Override
    public List<Vouchers> getAll(){
        List<Vouchers> vouchers = voucherRepository.getAllStatuskhacDaXoa();
        long newDate = new Date().getTime();
        for(Vouchers vouchers1: vouchers){
            long startdate = vouchers1.getStartDate().getTime();
            long enddate = vouchers1.getEndDate().getTime();
            long idVoucher = vouchers1.getId();
            long sl = vouchers1.getQuantity();
            //select status hết hạn
            if (vouchers1.getStatus() ==4){
                voucherRepository.updateStatusDiscount(4, idVoucher);
            }else {
                if(enddate < newDate && vouchers1.getStatus() !=3){
                    voucherRepository.updateStatusDiscount(3, idVoucher);
                }
                //select status chưa hoat dong
                if(startdate > newDate && vouchers1.getStatus() != 0){
                    voucherRepository.updateStatusDiscount(0, idVoucher);
                    voucherRepository.getAllStatuskhacDaXoa();
                }
                //select status hết khuyen mai

                //select status dang hoat dong
                if(startdate < newDate && enddate > newDate){
                    voucherRepository.updateStatusDiscount(1, idVoucher);
                    if(sl<=0){
                        voucherRepository.updateStatusDiscount(2, idVoucher);
                        voucherRepository.getAllStatuskhacDaXoa();
                    }
                }

            }
        }
        return vouchers;
    }

    @Override
    public List<Vouchers> getVoucherStatus(Integer status){
        List<Vouchers> vc = voucherRepository.getVoucherStatus(status);
        return vc;
    }

    @Override
    public List<Vouchers> getDataByCurrentDate(){
        Date newCurrentDate = new Date();
        return voucherRepository.findEntitiesInDateRange(newCurrentDate);
    }

    @Override
    public Vouchers save(Vouchers vouchers){

        long startdate = vouchers.getStartDate().getTime();
        long enddate = vouchers.getEndDate().getTime();
        long newDate = new Date().getTime();
        String randomCode = generateRandomCode(6);
        vouchers.setCode(randomCode);
        vouchers.setName(vouchers.getName());
        vouchers.setValue(vouchers.getValue());
        vouchers.setMinimumTotalAmount(vouchers.getMinimumTotalAmount());
        vouchers.setQuantity(vouchers.getQuantity());
        vouchers.setDescribe(vouchers.getDescribe());
        vouchers.setStartDate(vouchers.getStartDate());
        vouchers.setEndDate(vouchers.getEndDate());
        vouchers.setCreatedAt(new Date());
        vouchers.setUpdatedAt(new Date());
        vouchers.setCreatedBy("Admin");
        vouchers.setUpdatedBy("Admin");
        if(enddate < newDate ){
            vouchers.setStatus(3);
        }
        else if(startdate > newDate){
            vouchers.setStatus(0);
        }
        else if(startdate < newDate && enddate > newDate){
            vouchers.setStatus(1);
        }
//        vouchers.setStatus(vouchers.getStatus());
        return voucherRepository.save(vouchers);
    }
    private String generateRandomCode(int length) {
        String uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder randomCode = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(uppercaseCharacters.length());
            char randomChar = uppercaseCharacters.charAt(randomIndex);
            randomCode.append(randomChar);
        }

        return randomCode.toString();
    }

    @Override
    public void delete(Long id){
        voucherRepository.deleteById(id);
    }

    //uodate voucher
    @Override
    public Vouchers update(Long id, Vouchers vouchers){
        Optional<Vouchers> voucherOptional = voucherRepository.findById(id);
        if(voucherOptional.isPresent()){
            long startdate = vouchers.getStartDate().getTime();
            long enddate = vouchers.getEndDate().getTime();
            long newDate = new Date().getTime();
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
            vouchers1.setUpdatedAt(new Date());
            vouchers1.setCreatedBy("Admin");
            vouchers1.setUpdatedBy("Admin");
            if (vouchers1.getStatus()==4){
                vouchers1.setStatus(4);
            }else{
                if(enddate < newDate ){
                    vouchers1.setStatus(3);
                }
                else if(startdate > newDate){
                    vouchers1.setStatus(0);
                }
                else if(startdate < newDate && enddate > newDate){
                    vouchers1.setStatus(1);
                }
            }
            return voucherRepository.save(vouchers1);
        }else {
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
        }
    }

    //delete
    @Override
    public Vouchers updateStatus(Long id, Vouchers vouchers){
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
            vouchers1.setUpdatedAt(new Date());
            vouchers1.setCreatedBy(vouchers.getCreatedBy());
            vouchers1.setUpdatedBy(vouchers.getUpdatedBy());
            vouchers1.setStatus(4);

            return voucherRepository.save(vouchers1);
        }else {
            throw new IllegalArgumentException("Không tìm thấy khách hàng với ID " + id);
        }
    }


}