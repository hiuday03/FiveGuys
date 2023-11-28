package com.example.demo.model.response.onlineSales;


import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlHomeProductResponse {

    private Long id;

    private String name;

    private String code;

    private String nameCategory;

    private String nameMaterial;

    private BigDecimal price;

    private Integer totalQuantity;

    private Float rate;

    private String path;

}
