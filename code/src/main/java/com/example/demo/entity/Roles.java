package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="Roles")
public class Roles {
    @Id
    @GeneratedValue( strategy= GenerationType.AUTO)
    private Long id;
    @Column(name="FullName")
    private String fullName;
    @Column(name= "CreatedAt")
    private Date createdAt;
    @Column(name= "UpdatedAt")
    private Date updatedAt;
    @Column(name= "Status")
    private Integer status;
}
