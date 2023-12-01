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
@Table(name = "PaymentMethods")

public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @Column(name = "paymentType")
    private int paymentType;

    @Column(name = "Status")
    private int status;
}
