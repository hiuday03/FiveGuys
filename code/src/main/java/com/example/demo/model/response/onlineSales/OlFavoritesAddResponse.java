package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Product;
import lombok.*;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlFavoritesAddResponse {


    private Long id;


    private CustomerEntity customer;


    private Long idProduct;


    private int status;



}
