package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.Cart;
import com.example.demo.entity.ProductDetail;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlCartResponse {


    private Long id;

    private int quantity;

    private BigDecimal price;

    private Cart cart;

    private ProductDetail productDetail;

    private int status;

    private String path;

}
