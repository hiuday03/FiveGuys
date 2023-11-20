package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "BillDetails")

public class BillDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Quantity", nullable = false)
    private int quantity;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "IdBill", nullable = false)
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "IdProductDetail", nullable = false)
    private ProductDetail productDetail;

//    @ManyToOne
//    @JoinColumn(name = "IdColor", nullable = false)
//    private Color color;

    @Column(name = "Status", nullable = false)
    private int status;
}