package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "Address")

public class AddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "Address")
    private String address;

    @Column(name = "AddressType")
    private String addressType;

    @ManyToOne
    @JoinColumn(name = "IdCustomer")
    private CustomerEntity customer;

    @Column(name = "CreateAt")
    private Date createAt;

    @Column(name = "UpdateAt")
    private Date updateAt;

    @Column(name = "Status")
    private int status;

}
