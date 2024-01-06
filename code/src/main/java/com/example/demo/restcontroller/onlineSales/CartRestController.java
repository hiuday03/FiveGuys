package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.*;
import com.example.demo.model.response.onlineSales.OlCartResponse;
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
    private OlImageService olImageService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/cartDetail")
    public ResponseEntity<List<OlCartResponse>> getCart(@RequestParam(name = "username") String currentUsername) {
        Optional<AccountEntity> account = olAccountService.findByAccount(currentUsername);
        if (account.isPresent()) {
            Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            if (customer.isPresent()) {
                Cart gioHang = olCartService.findByCustomerId(customer.get().getId());
                if (gioHang != null) {
                    List<CartDetail> chiTietGioHang = olCartDetailService.findAllByCart_Id(gioHang.getId());
                    List<OlCartResponse> olCartResponses = new ArrayList<>();
                    for (CartDetail cartDetail : chiTietGioHang) {
                        OlCartResponse olCartResponse = new OlCartResponse();
                        olCartResponse.setId(cartDetail.getId());
                        olCartResponse.setQuantity(cartDetail.getQuantity());
                        olCartResponse.setPrice(cartDetail.getPrice());
                        olCartResponse.setCart(cartDetail.getCart());
                        olCartResponse.setProductDetail(cartDetail.getProductDetail());
                        olCartResponse.setStatus(cartDetail.getStatus());

                        List<Image> images = olImageService.findByProductDetailId(cartDetail.getProductDetail().getId());
                        if (!images.isEmpty()) {
                            olCartResponse.setPath(images.get(0).getPath());
                        }

                        olCartResponses.add(olCartResponse);
                    }
                    return ResponseEntity.ok(olCartResponses);
                }
            }
        }
        return ResponseEntity.ok(Collections.emptyList());
    }




    @PostMapping("/cart/add")
    public ResponseEntity<?> creat(@RequestBody JsonNode orderData) {
        String username = String.valueOf(orderData.get("username").asText());
        Optional<AccountEntity> account = olAccountService.findByAccount(username);

        if (account.isPresent()) {
            Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));
            Optional<Employees> employeeEntity = Optional.ofNullable(olEmployeeService.findByAccount_Id(account.get().getId()));

            if (employeeEntity != null && employeeEntity.isPresent()) {
                Map<String, Object> responseData = new HashMap<>();
                responseData.put("employeeLoggedIn", true);
                return ResponseEntity.ok(responseData);
            }

            if (customer.isPresent()) {
                Cart cart = olCartService.findByCustomerId(customer.get().getId());

                if (cart == null) {
                    cart = new Cart();
                    cart.setCustomer(customer.get());
                    cart.setCreatedAt(new Date());
                    cart.setUpdatedAt(new Date());
                    cart.setStatus(1);
                    cart = olCartService.save(cart);
                }

                Long productDetailId = Long.valueOf(orderData.get("productDetailId").asText());
                int quantity = orderData.get("quantity").asInt();

                Optional<ProductDetail> productDetail = olProductDetailService.findById(productDetailId);

                if (productDetail.isPresent()) {
                    int availableQuantity = productDetail.get().getQuantity();

                    int totalQuantityInCart = olCartDetailService.getTotalQuantityInCart(cart.getId(), productDetailId);
                    int remainingQuantity = availableQuantity - totalQuantityInCart;

                    if (remainingQuantity >= quantity) {
                        CartDetail cartDetail = olCartDetailService.findCartDetail(cart.getId(), productDetailId);

                        if (cartDetail != null) {
                            cartDetail.setQuantity(cartDetail.getQuantity() + quantity);
                            olCartDetailService.save(cartDetail);
                        } else {
                            CartDetail newCartDetail = new CartDetail();
                            newCartDetail.setCart(cart);
                            newCartDetail.setProductDetail(productDetail.get());
                            newCartDetail.setQuantity(quantity);
                            newCartDetail.setPrice(productDetail.get().getPrice());
                            newCartDetail.setStatus(1);
                            olCartDetailService.save(newCartDetail);
                        }
                        return ResponseEntity.ok(1); // Thêm thành công
                    } else {
                        return ResponseEntity.ok(2); // Số lượng không đủ
                    }
                } else {
                    return ResponseEntity.ok(0);
                }
            } else {
                return ResponseEntity.ok(0);

            }
        }
        return ResponseEntity.ok(0);

    }




    @PostMapping("/cart/update")
    public ResponseEntity<?> update(@RequestBody JsonNode orderData) {
        String cartDetailId = orderData.get("cartDetailId").asText();
        int quantity = orderData.get("quantity").asInt();

        if (cartDetailId != null && quantity >= 0) {
            Optional<CartDetail> cartDetail = olCartDetailService.findById(Long.valueOf(cartDetailId));
            if (cartDetail.isPresent()) {
                Optional<ProductDetail> productDetail = olProductDetailService.findById(cartDetail.get().getProductDetail().getId());
                int availableQuantity = productDetail.get().getQuantity();

                int totalQuantityInCart = olCartDetailService.getTotalQuantityInCart(cartDetail.get().getCart().getId(), cartDetail.get().getProductDetail().getId());
                int remainingQuantity = availableQuantity - (totalQuantityInCart - cartDetail.get().getQuantity());

                if (remainingQuantity >= quantity) {
                    // Số lượng đủ, tiến hành cập nhật
                    int newQuantity = quantity;
                    if (quantity == 0) {
                        // Nếu quantity là 0, xóa CartDetail tương ứng
                        olCartDetailService.deleteById(cartDetail.get().getId());
                        newQuantity = cartDetail.get().getQuantity();
                    } else {
                        cartDetail.get().setQuantity(quantity);
                        olCartDetailService.save(cartDetail.get());
                    }

                    int updatedQuantity = productDetail.get().getQuantity() + (cartDetail.get().getQuantity() - newQuantity);
                    productDetail.get().setQuantity(updatedQuantity);
                    olProductDetailService.save(productDetail.get());

                    return ResponseEntity.ok(1);
                } else {
                    // Số lượng không đủ
                    return ResponseEntity.ok(2);
                }
            }
        }
        return ResponseEntity.ok(0);

    }


    @Transactional
    @PostMapping("/cart/remove")
    public void remove(
            @RequestBody JsonNode orderData) {

        String cartDetailId = orderData.get("cartDetailId").asText(); // Lấy giá trị UUID dưới dạng String

        if (cartDetailId != null) {
            Optional<CartDetail> chiTietGioHang = olCartDetailService.findById(Long.valueOf(cartDetailId));

            if (chiTietGioHang.isPresent()) {
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
