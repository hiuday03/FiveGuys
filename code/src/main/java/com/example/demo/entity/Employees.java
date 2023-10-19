package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="Employees")
public class Employees {
    @Id
    @GeneratedValue( strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name= "FullName")
    private String fullName;

    @Column(name= "Avatar")
    private String avatar;

    @Column(name= "Account")
    private String account;

    @Column(name= "Password")
    private String password;

    @Column(name= "PhoneNumber")
    private String phoneNumber;

    @Column(name= "Email")
    private String email;

    @Column(name= "BirthDate")
    private Date birthDate;

    @Column(name= "Gender")
    private Boolean gender;

    @Column(name= "Address")
    private String address;

    @Column(name= "CreatedAt")
    private Date createdAt;

    @Column(name= "UpdatedAt")
    private Date updatedAt;

    @Column(name= "CreatedBy")
    private String createdBy;

    @Column(name= "UpdatedBy")
    private String updatedBy;

    @Column(name= "Status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name="IdRole")
    private Roles roles;

}
