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
@Table(name = "Cards")
public class Cards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bankname")
    private String bankName;

    @Column(name = "bankcode")
    private String bankCode;

    @Column(name = "accountno")
    private String accountNo;

    @Column(name = "accountname")
    private String accountName;

    @Column(name = "acqid")
    private Integer acqId;

    @Column(name = "description")
    private String description;

    @Column(name= "CreatedBy")
    private String createdBy;

    @Column(name= "CreatedAt")
    private Date createdAt;

}
