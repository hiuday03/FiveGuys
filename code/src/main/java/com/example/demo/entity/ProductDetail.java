package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "ProductDetails")
public class ProductDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "ImportPrice")
    private BigDecimal importPrice;

    @Column(name = "Price")
    private BigDecimal price;

    @Column(name = "Quantity")
    private Integer quantity;

    @Column(name = "Barcode")
    private String barcode;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @Column(name = "CreatedBy")
    private String createdBy;

    @Column(name = "UpdatedBy")
    private String updatedBy;

    @Column(name = "Status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "IdProduct")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "IdSize")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "IdColor")
    private Color color;

    @OneToMany(
            mappedBy = "productDetail",
            cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}
    )
    private List<Image> images;
}
