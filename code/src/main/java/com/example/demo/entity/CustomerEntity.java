package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Customers")


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
    private Boolean gender;

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

}

