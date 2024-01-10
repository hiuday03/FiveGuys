package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "RefreshToken")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Token")
    private String token;

    @Column(name = "ExpiryDate")
    private Date expiryDate;

    @ManyToOne
    @JoinColumn(name = "IdAccount")
    private AccountEntity accountEntity;


}
