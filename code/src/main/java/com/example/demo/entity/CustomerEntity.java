package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Table(name = "Customers")
@Data

public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "FullName")
    private String fullName;

    @Column(name = "Avatar")
    private String avatar;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "BirthDate")
    private Date birthDate;

    @Column(name = "Gender")
    private boolean gender;

    @ManyToOne
    @JoinColumn(name = "IdAccount")
    private AccountEntity account;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "CreatedAt")
    private Date createdAt;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @Column(name = "CreatedBy")
    private String createdBy;

    @Column(name = "UpdatedBy")
    private String updatedBy;

    @Column(name = "Status")
    private int status;

<<<<<<< HEAD
<<<<<<< HEAD
//    @OneToOne
//    @JoinColumn(name = "IdAccount")
//    private AccountEntity accounts;
=======
>>>>>>> develop
=======
>>>>>>> 2604c71244a188cb01c2f8826de82e86568fe39c
}

