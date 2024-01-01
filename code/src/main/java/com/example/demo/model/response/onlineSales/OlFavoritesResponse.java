package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.ProductDetail;
import lombok.*;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlFavoritesResponse {


    private Long id;


    private CustomerEntity customer;


    private ProductDetail productDetail;


    private Date createdAt;


    private Date updatedAt;

    private int status;

    private String path;

}
