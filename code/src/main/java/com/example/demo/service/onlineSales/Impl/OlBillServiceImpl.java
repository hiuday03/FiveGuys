package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.Bill;
import com.example.demo.entity.BillDetail;
import com.example.demo.entity.ProductDetail;
import com.example.demo.entity.Vouchers;
import com.example.demo.repository.onlineSales.OLBillDetailRepository;
import com.example.demo.repository.onlineSales.OLBillRepository;
import com.example.demo.repository.onlineSales.OLProductDetailRepository;
import com.example.demo.repository.onlineSales.OLVouchersRepository;
import com.example.demo.service.onlineSales.OLProductDetailService;
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
    private OLProductDetailService olProductDetailService;

    @Autowired
    private OLVouchersRepository olVouchersRepository;

    private void updateProductQuantity(BillDetail billDetail) {
        Optional<ProductDetail> productDetail = olProductDetailService.findById(billDetail.getProductDetail().getId());
        if (productDetail.isPresent()){
            int quantityToRemove = billDetail.getQuantity();
            if (isQuantityAvailable(productDetail.get(), quantityToRemove)) {
                int currentQuantity = productDetail.get().getQuantity();
                productDetail.get().setQuantity(currentQuantity - quantityToRemove);
                olProductDetailService.save(productDetail.get());
            } else {
                throw new IllegalArgumentException("Not enough quantity available for product: " + productDetail.get().getId());
            }
        }
    }

    private boolean isQuantityAvailable(ProductDetail productDetail, int quantityToRemove) {
        int currentQuantity = productDetail.getQuantity();
//        System.out.println("Hien tại "+ currentQuantity);
//        System.out.println("So tru "+ quantityToRemove);
        return currentQuantity >= quantityToRemove;
    }


    @Override
    public Bill TaoHoaDonNguoiDungChuaDangNhap(JsonNode orderData) {
        if (orderData == null) {
            throw new IllegalArgumentException("orderData cannot be null");
        }

        ObjectMapper mapper = new ObjectMapper();
        Bill bill = mapper.convertValue(orderData, Bill.class);

        // Kiểm tra số lượng tồn của voucher trước khi sử dụng
        if (bill.getVoucher() != null) {

            Vouchers existingVoucher = olVouchersRepository.findById(bill.getVoucher().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Voucher not found"));

            if (existingVoucher != null && existingVoucher.getStatus() == 1 && existingVoucher.getQuantity() > 0) {
                existingVoucher.setQuantity(existingVoucher.getQuantity() - 1);
                olVouchersRepository.save(existingVoucher);
            } else {
                throw new IllegalStateException("Voucher is not available");
            }
            // Kiểm tra và xử lý số lượng sản phẩm trước khi thanh toán
            List<BillDetail> billDetails = mapper.convertValue(orderData.get("billDetail"), new TypeReference<List<BillDetail>>() {
            });
            for (BillDetail detail : billDetails) {
                updateProductQuantity(detail); // Cập nhật số lượng sản phẩm cho mỗi chi tiết hóa đơn
                detail.setBill(bill);
            }
            // Lưu thông tin hóa đơn và chi tiết hóa đơn vào cơ sở dữ liệu
            Bill savedBill = olProductDetailRepository.save(bill);
            olBillDetailRepository.saveAll(billDetails);
            return savedBill;
        }


//    @Override
//    public Bill TaoHoaDonNguoiDungChuaDangNhap(JsonNode orderData) {
//        if (orderData == null) {
//            throw new IllegalArgumentException("orderData cannot be null");
//        }
//
//        ObjectMapper mapper = new ObjectMapper();
//        Bill bill = mapper.convertValue(orderData, Bill.class);
//        Bill savedBill = olProductDetailRepository.save(bill);
//
//        JsonNode billDetailNode = orderData.get("billDetail");
//        if (billDetailNode != null && billDetailNode.isArray()) {
//            TypeReference<List<BillDetail>> type = new TypeReference<>() {};
//            List<BillDetail> billDetail = mapper.convertValue(billDetailNode, type)
//                    .stream().peek(d -> d.setBill(savedBill)).collect(Collectors.toList());
//            olBillDetailRepository.saveAll(billDetail);
//        } else {
//            throw new IllegalArgumentException("orderDetails must be a non-null array");
//        }
//
//        return bill;
//    }
        return null;
    }
}
