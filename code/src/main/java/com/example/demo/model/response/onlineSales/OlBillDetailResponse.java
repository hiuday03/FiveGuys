package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.Bill;
import com.example.demo.entity.ProductDetail;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString

public class OlBillDetailResponse {

    private Long id;

    private int quantity;

    private BigDecimal price;

    private Bill bill;

    private ProductDetail productDetail;

    private int status;

    private boolean  rated;

}
