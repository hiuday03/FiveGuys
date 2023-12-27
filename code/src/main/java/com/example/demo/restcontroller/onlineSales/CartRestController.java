package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.*;
import com.example.demo.service.onlineSales.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ol")
public class CartRestController {


    @Autowired
    private OlCartService olCartService;

    @Autowired
    private OlCustomerService olCustomerService;

    @Autowired
    private OlEmployeeService olEmployeeService;

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private OlCartDetailService olCartDetailService;

    @Autowired
    private OLProductService olProductService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/cartDetail")
    public ResponseEntity<List<CartDetail>> getCart(@RequestParam(name = "username") String currentUsername) {
        Optional<AccountEntity> account = olAccountService.findByAccount(currentUsername);
        if (account.isPresent()){
                Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
                if (customer.isPresent()) {
                    Cart gioHang = olCartService.findByCustomerId(customer.get().getId());
                    if (gioHang != null) {
                        List<CartDetail> chiTietGioHang = olCartDetailService.findAllByCart_Id(gioHang.getId());
                        return ResponseEntity.ok(chiTietGioHang);
                    }
                }
    }
        return ResponseEntity.ok(Collections.emptyList());
    }



    @PostMapping("/cart/add")
    public ResponseEntity<?> creat(@RequestBody JsonNode orderData) {

        String username =String.valueOf(orderData.get("username").asText());

        Optional<AccountEntity> account = olAccountService.findByAccount(username);
        if (account.isPresent()) {
            Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            Optional<Employees> employeeEntity = Optional.ofNullable(olEmployeeService.findByAccount_Id(account.get().getId()));

            if (employeeEntity != null && employeeEntity.isPresent()) {
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("employeeLoggedIn", true);
                return ResponseEntity.ok(responseData);
            }

            if ( customer != null && customer.isPresent()) {
                    Cart cart = olCartService.findByCustomerId(customer.get().getId());

                    if (cart == null) {
                        cart = new Cart();
                        cart.setCustomer(customer.get());
                        cart.setCreatedAt(new Date());
                        cart.setUpdatedAt(new Date());
                        cart.setStatus(1);
                        cart = olCartService.save(cart);
                    }
                    Long productDetailId =Long.valueOf(orderData.get("productDetailId").asText());
                    int quantity = orderData.get("quantity").asInt(); // Lấy giá trị số lượng
                    Optional<ProductDetail> productDetail = olProductDetailService.findById((productDetailId));
                    if (productDetail.isPresent()) {
                        CartDetail cartDetail = null;
                        List<CartDetail> cartDetails = olCartDetailService.findAllByCart_Id(cart.getId());
                        for (CartDetail ctgh : cartDetails) {
                            System.out.println("Id productDetail sau" + ctgh.getProductDetail().getId());
                            if (ctgh.getProductDetail().getId().equals(productDetail.get().getId())) {
                                cartDetail = ctgh;
                                break;
                            }
                        }
                        if (cartDetail != null) {
                            cartDetail.setQuantity(cartDetail.getQuantity() +quantity);
                            olCartDetailService.save(cartDetail);
                        } else {
                            CartDetail newChiTietGioHang = new CartDetail();
                            newChiTietGioHang.setCart(cart);
                            newChiTietGioHang.setProductDetail(productDetail.get());
                            newChiTietGioHang.setQuantity(quantity);
                            newChiTietGioHang.setPrice(productDetail.get().getPrice());
                            newChiTietGioHang.setStatus(1);
                            cartDetail = newChiTietGioHang;
                            olCartDetailService.save(cartDetail);
    
                        }


                        // Cập nhật lại số lượng của ChiTietSanPham
                        // chiTietSanPham.get().setSoLuong(chiTietSanPham.get().getSoLuong() - 1);
                        // chiTietSanPhamService.save(chiTietSanPham.get());

                        return ResponseEntity.ok(cartDetail);
                    }
        }else {
            return ResponseEntity.status(400).body(null);

        }
        }

        return ResponseEntity.status(400).body(null);
    }




    @PostMapping("/cart/update")
    public ResponseEntity<?> update(
            @RequestBody JsonNode orderData) {

        String cartDetailId = orderData.get("cartDetailId").asText(); // Lấy giá trị UUID dưới dạng String
        int quantity = orderData.get("quantity").asInt(); // Lấy giá trị số lượng

        if (cartDetailId != null && quantity >= 0) {
            Optional<CartDetail> chiTietGioHang = olCartDetailService.findById(Long.valueOf(cartDetailId));
            if (chiTietGioHang.isPresent()) {
                Optional<ProductDetail> chiTietSanPham = olProductDetailService.findById(chiTietGioHang.get().getProductDetail().getId());
                int soLuongThayDoi = chiTietGioHang.get().getQuantity() - quantity;

                if (quantity == 0) {
                    chiTietSanPham.get().setQuantity(chiTietSanPham.get().getQuantity() + soLuongThayDoi);
                    olProductDetailService.save(chiTietSanPham.get());
                    olCartDetailService.deleteById(Long.valueOf(cartDetailId));
                    return ResponseEntity.ok("Updated and Deleted successfully");
                }

                chiTietGioHang.get().setQuantity(quantity);
                CartDetail cartDetail = olCartDetailService.save(chiTietGioHang.get());
//                chiTietSanPham.get().setSoLuong(chiTietSanPham.get().getSoLuong() + soLuongThayDoi);
//                chiTietSanPhamService.save(chiTietSanPham.get());

                return ResponseEntity.ok(cartDetail);
            }
        }
        return ResponseEntity.status(400).body("Invalid request data");
    }


    @Transactional
    @PostMapping("/cart/remove")
    public void remove(
            @RequestBody JsonNode orderData) {

        String cartDetailId = orderData.get("cartDetailId").asText(); // Lấy giá trị UUID dưới dạng String


        if (cartDetailId != null) {
            Optional<CartDetail> chiTietGioHang = olCartDetailService.findById(Long.valueOf(cartDetailId));

            if (chiTietGioHang.isPresent()) {
                ProductDetail chiTietSanPham = chiTietGioHang.get().getProductDetail();
                int soLuongThayDoi = chiTietGioHang.get().getQuantity();

                // Cập nhật số lượng của ChiTietSanPham
//                chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() + soLuongThayDoi);
//                chiTietSanPhamService.save(chiTietSanPham);

                // Xóa ChiTietGioHang
                olCartDetailService.deleteById(Long.valueOf(cartDetailId));
            }
        }


    }



    @Transactional
    @PostMapping("/cart/clear")
    public void clearCart(@RequestParam(name = "username") String currentUsername) {


            Optional<AccountEntity> account = olAccountService.findByAccount(currentUsername);

            if (account.isPresent()) {
                Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));

                if (customer.isPresent()) {
                    Cart gioHang = olCartService.findByCustomerId(customer.get().getId());

                    if (gioHang != null) {
                        List<CartDetail> chiTietGioHangs = olCartDetailService.findAllByCart_Id(gioHang.getId());

                        for (CartDetail chiTietGioHang : chiTietGioHangs) {
                            ProductDetail chiTietSanPham = chiTietGioHang.getProductDetail();
                            int soLuongHienTai = chiTietSanPham.getQuantity();
                            int soLuongThem = chiTietGioHang.getQuantity();
                    chiTietSanPham.setQuantity(soLuongHienTai + soLuongThem);
                    olProductDetailService.save(chiTietSanPham);
                        }

                        // Xóa tất cả ChiTietGioHang sau khi cập nhật thành công ChiTietSanPham
                        olCartDetailService.deleteAllByCart_Id(gioHang.getId());

                    }
                }
            }
    }


    @PostMapping("/cart/saveAll")
    public ResponseEntity<?> saveAllProductDetail(@RequestBody JsonNode orderData){
        return ResponseEntity.ok(olCartService.saveAllProductDetail(orderData));
    }
}
