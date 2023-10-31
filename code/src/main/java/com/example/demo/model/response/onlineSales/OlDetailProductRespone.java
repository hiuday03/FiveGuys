package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.Image;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlDetailProductRespone {


    private Long id;

    private String code;

    private String name;

    private String nameCategory;

    private String nameMaterial;

    private BigDecimal price;

    private String collar;

    private String wrist;

    private String describe;

    private String brand;

    private List<Image> images;




}
