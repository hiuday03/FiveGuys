package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductDetail;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlFavoritesResponse {


    private Long id;


    private CustomerEntity customer;


    private Product product;


    private Date createdAt;

    private BigDecimal price;

    private Date updatedAt;

    private int status;

    private String path;

}
