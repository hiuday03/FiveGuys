package com.example.demo.model.response.offlineSales;

import com.example.demo.entity.Color;
import com.example.demo.entity.Product;
import com.example.demo.entity.Size;
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
@Entity
@Table(name = "ProductDetails")
public class OfModelProductDetail {
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

    @OneToMany(mappedBy = "productDetail", cascade = CascadeType.ALL)
    private List<OfModelImage> images;

}
