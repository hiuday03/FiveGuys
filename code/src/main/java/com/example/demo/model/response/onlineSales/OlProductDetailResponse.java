package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlProductDetailResponse {

    private Long id;

    private BigDecimal importPrice;

    private BigDecimal price;

    private Integer quantity;

    private String barcode;

    private Date createdAt;

    private Date updatedAt;

    private String createdBy;

    private String updatedBy;

    private Integer status;


    private Product product;

    private Size size;

    private Color color;

    private List<Image> images;

    private List<BillDetail> billDetails;

    private String path;

}
