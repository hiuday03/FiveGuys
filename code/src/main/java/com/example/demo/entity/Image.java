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
@Table(name = "Images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Path")
    private String path;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "UpdatedAt")
    private Date updatedAt;

    @Column(name = "Status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "IdProductDetail")
    private Product productDetail;
}
