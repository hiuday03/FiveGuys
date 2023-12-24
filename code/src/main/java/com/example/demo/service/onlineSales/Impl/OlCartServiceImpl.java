package com.example.demo.service.onlineSales.Impl;

import com.example.demo.entity.*;
import com.example.demo.repository.onlineSales.OLCartRepository;
import com.example.demo.security.AuthController;
import com.example.demo.security.UserAuthentication;
import com.example.demo.service.onlineSales.*;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OlCartServiceImpl implements OlCartService {

    @Autowired
    private OlAccountService olAccountService;

    @Autowired
    private UserAuthentication userAuthentication;

    @Autowired
    private OLCartRepository olCartRepository;

    @Autowired
    private OlCustomerService olCustomerService;

//    @Autowired
//    private OlCartService olCartService;

    @Autowired
    private OlCartDetailService olCartDetailService;

    @Autowired
    private OLProductDetailService olProductDetailService;

    @Override
    public Cart findByCustomerId(Long id) {
        return olCartRepository.findByCustomerId(id);
    }

    @Override
    public Cart save(Cart gioHang) {
        return olCartRepository.save(gioHang);
    }

    @Override
    public Cart saveAllProductDetail(JsonNode orderData) {
        Authentication authentication = userAuthentication.getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && !"anonymousUser".equals(authentication.getPrincipal())) {
            String currentUsername = authentication.getName();
            Optional<AccountEntity> account = olAccountService.findByAccount(currentUsername);

            if (account.isPresent()) {
                Optional<CustomerEntity> customer = Optional.ofNullable(olCustomerService.findByAccount_Id(account.get().getId()));

                if (customer.isPresent()) {
                    Cart cart = olCartRepository.findByCustomerId(customer.get().getId());

                    if (cart == null) {
                        cart = new Cart();
                        cart.setCustomer(customer.get());
                        cart.setCreatedAt(new Date());
                        cart.setUpdatedAt(new Date());
                        cart.setStatus(1);
                        cart = olCartRepository.save(cart);
                    }

                    List<CartDetail> cartDetails = olCartDetailService.findAllByCart_Id(cart.getId());

                    for (JsonNode item : orderData) {
                        Long productId = Long.valueOf(item.get("id").asText());
                        Optional<ProductDetail> productDetail = olProductDetailService.findById(productId);

                        if (productDetail.isPresent()) {
                            Optional<CartDetail> foundCartDetail = cartDetails.stream()
                                    .filter(cd -> cd.getProductDetail().getId().equals(productDetail.get().getId()))
                                    .findFirst();

                            if (foundCartDetail.isPresent()) {
                                foundCartDetail.get().setQuantity(foundCartDetail.get().getQuantity() + Integer.valueOf(item.get("quantity").asText()));
                                olCartDetailService.save(foundCartDetail.get());
                            } else {
                                CartDetail newCartDetail = new CartDetail();
                                newCartDetail.setCart(cart);
                                newCartDetail.setPrice(BigDecimal.valueOf(Long.valueOf(item.get("price").asText())));
                                newCartDetail.setProductDetail(productDetail.get());
                                newCartDetail.setQuantity(Integer.valueOf(item.get("quantity").asText()));
                                newCartDetail.setStatus(1);
                                olCartDetailService.save(newCartDetail);
                            }
                        }
                    }
                    return cart;
                }
            }
        }
        return null;
    }


}
