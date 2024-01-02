package com.example.demo.service.serviceiplm;

import com.example.demo.entity.Bill;
import com.example.demo.repository.BillRepository;
import com.example.demo.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public List<Bill> getAllBill() {
        return billRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Bill getBillById(Long id) {
        return billRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Bill> getAllBillPage(Integer page) {
        Pageable pageable = PageRequest.of(page, 1);
        return billRepository.findAll(pageable);
    }

    @Override
    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public Bill updateBill(Bill bill, Long id) {
        Optional<Bill> existingBill = billRepository.findById(id);
        if (existingBill.isPresent()){
            Bill bill1 = existingBill.get();
            bill1.setCode(bill.getCode());
            bill1.setCreatedAt(bill.getCreatedAt());
            bill1.setPaymentDate(bill.getPaymentDate());
            bill1.setTotalAmount(bill.getTotalAmount());
            bill1.setTotalAmountAfterDiscount(bill.getTotalAmountAfterDiscount());
            bill1.setReciverName(bill.getReciverName());
            bill1.setDeliveryDate(bill.getDeliveryDate());
            bill1.setShippingFee(bill.getShippingFee());
            bill1.setAddress(bill.getAddress());
            bill1.setPhoneNumber(bill.getPhoneNumber());
            bill1.setNote(bill.getNote());
            bill1.setCustomerEntity(bill.getCustomerEntity());
            bill1.setEmployee(bill.getEmployee());
            bill1.setPaymentMethod(bill.getPaymentMethod());
            bill1.setVoucher(bill.getVoucher());
            bill1.setStatus(bill.getStatus());
            return billRepository.save(bill1);
        }else{
            throw new IllegalArgumentException("Không tìm thấy bill với Id "+ id);
        }
    }

    @Override
    public void deleteBill(Long id) {
        if (billRepository.existsById(id)){
            billRepository.deleteById(id);
        }else{
            throw new IllegalArgumentException("Không tìm thấy bill với Id "+ id);
        }
    }

    @Override
    public Bill updateStatus(Integer status, Long id) {
        Optional<Bill> existingBill = billRepository.findById(id);
        if (existingBill.isPresent()){
            Bill bill1 = existingBill.get();
            bill1.setStatus(status);
            return billRepository.save(bill1);
        }else{
            throw new IllegalArgumentException("Không tìm thấy bill với Id "+ id);
        }
    }
}
