package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Data
@Getter
@Setter
@Entity
@Table(name="Employees")
public class Employees {
    @Id
    @GeneratedValue( strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name= "Code")
    private String code;

    @Column(name= "FullName")
    private String fullName;

    @Column(name= "Avatar")
    private String avatar;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy/MM/dd")
    @Column(name= "BirthDate")
    private Date birthDate;

    @Column(name= "Gender")
    private Boolean gender;

    @Column(name= "Address")
    private String address;

    @ManyToOne
    @JoinColumn(name = "IdAccount")
    private AccountEntity account;
    
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
