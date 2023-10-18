package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "Code")
    private String code;

    @Column(name = "Name")
    private String name;

    @Column(name = "Collar")
    private String collar;

    @Column(name = "Wrist")
    private String wrist;

    @Column(name = "Describe")
    private String describe;

    @Column(name = "Brand")
    private String brand;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @Column(name = "CreatedBy")
    private Date createdby;

    @Column(name = "UpdatedBy")
    private Date updatedby;

    @Column(name = "Status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "IdCategory")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "IdMaterial")
    private Material material;
}
