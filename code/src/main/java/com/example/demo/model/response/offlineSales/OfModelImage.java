package com.example.demo.model.response.offlineSales;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "Images")
public class OfModelImage {
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdProductDetail")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private OfModelProductDetail productDetail;
}
