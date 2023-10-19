package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Ratings")

public class RatingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "Rate")
    private int rate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CreatedAt")
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "IdCustomer")
    private CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(name = "IdProductDetail")
    private ProductDetail productDetail;

    @Column(name = "Status")
    private int status;
}
