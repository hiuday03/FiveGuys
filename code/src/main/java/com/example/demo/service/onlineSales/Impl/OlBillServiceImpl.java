package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Vouchers;
import com.example.demo.model.response.onlineSales.OlBillResponse;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLBillRepository;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.repository.onlineSales.OLVouchersRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
import com.example.demo.service.onlineSales.OlBillDetailService;
import com.example.demo.service.onlineSales.OlBillService;
import com.example.demo.service.onlineSales.OlVouchersService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class OlBillServiceImpl implements OlBillService {

    @Autowired
    private OLBillRepository olProductDetailRepository;

    @Autowired
    private OLBillDetailRepository olBillDetailRepository;

    @Autowired
    private OlBillDetailService olBillDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OLVouchersRepository olVouchersRepository;

    @Autowired
    private OLBillRepository olBillRepository;




    @Override
    public Bill TaoHoaDonNguoiDungChuaDangNhap(JsonNode orderData) {
        if (orderData == null) {
            throw new IllegalArgumentException("orderData cannot be null");
        }

        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(orderData, Bill.class);

        // Kiểm tra số lượng tồn của voucher trước khi sử dụng
        if (bill.getVoucher() != null){

            Vouchers existingVoucher = olVouchersRepository.findById(bill.getVoucher().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Voucher not found"));

            if (existingVoucher != null && existingVoucher.getStatus() == 1 && existingVoucher.getQuantity() > 0) {
                existingVoucher.setQuantity(existingVoucher.getQuantity() - 1);
                olVouchersRepository.save(existingVoucher);
            } else {
                throw new IllegalStateException("Voucher is not available");
            }
        }

        // Kiểm tra và xử lý số lượng sản phẩm trước khi thanh toán
        List<BillDetail> billDetails = mapper.convertValue(orderData.get("billDetail"), new TypeReference<List<BillDetail>>() {});
        for (BillDetail detail : billDetails) {
//            updateProductQuantity(detail);
            detail.setBill(bill);
        }
        // Lưu thông tin hóa đơn và chi tiết hóa đơn vào cơ sở dữ liệu
        Bill savedBill = olProductDetailRepository.save(bill);
        olBillDetailRepository.saveAll(billDetails);
        return savedBill;
    }



    @Override
    public List<Bill> findAllByCustomerEntity_IdAndStatus(Long id) {
        return   olBillRepository.findAllByCustomerEntity_IdAndStatus(id,1);
    }

    @Override
    public boolean updatePaymentStatus(Long billId, int paymentStatus) {
        Optional<Bill> optionalBill = olBillRepository.findById(billId);
        if (optionalBill.isPresent()) {
            Bill bill = optionalBill.get();
            bill.setPaymentStatus(paymentStatus);
            olBillRepository.save(bill);
            return true;
        }
        return false;
    }

    private OlBillResponse mapBillToOlBillResponse(Bill bill) {
        OlBillResponse olBillResponse = new OlBillResponse();
        olBillResponse.setId(bill.getId());
        olBillResponse.setCode(bill.getCode());
        olBillResponse.setCreatedAt(bill.getCreatedAt());
        olBillResponse.setPaymentDate(bill.getPaymentDate());
        olBillResponse.setTotalAmount(bill.getTotalAmount());
        olBillResponse.setTotalAmountAfterDiscount(bill.getTotalAmountAfterDiscount());
        olBillResponse.setReciverName(bill.getReciverName());
        olBillResponse.setDeliveryDate(bill.getDeliveryDate());
        olBillResponse.setShippingFee(bill.getShippingFee());
        olBillResponse.setAddress(bill.getAddress());
        olBillResponse.setPhoneNumber(bill.getPhoneNumber());
        olBillResponse.setNote(bill.getNote());
        olBillResponse.setCustomerEntity(bill.getCustomerEntity());
        olBillResponse.setEmployee(bill.getEmployee());
        olBillResponse.setPaymentMethod(bill.getPaymentMethod());
        olBillResponse.setVoucher(bill.getVoucher());
        olBillResponse.setTypeBill(bill.getTypeBill());
        olBillResponse.setPaymentStatus(bill.getPaymentStatus());
        olBillResponse.setStatus(bill.getStatus());
        olBillResponse.setBillDetail(olBillDetailService.findByBill_IdAndStatus(bill.getId()));
        return olBillResponse;
    }

    @Override
    public OlBillResponse findBYId(Long id) {
        Optional<Bill> bill = olBillRepository.findById(id);
        if (bill.isPresent()){
            return mapBillToOlBillResponse(bill.get());
        }
        return null;
    }


}
