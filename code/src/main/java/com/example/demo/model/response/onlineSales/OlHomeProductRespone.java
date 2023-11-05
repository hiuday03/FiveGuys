package com.example.demo.model.response.onlineSales;


import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlHomeProductRespone {

    private Long id;

    private String name;

    private String code;

    private String nameCategory;

    private String nameMaterial;

    private BigDecimal price;

    private String image;

}
