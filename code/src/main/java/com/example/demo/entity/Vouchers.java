package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name="Vouchers")
public class Vouchers {
    @Id
    @GeneratedValue( strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name= "Code")
    private String code;

    @Column(name= "Name")
    private String name;

    @Column(name= "Value")
    private BigDecimal value;

    @Column(name= "ValueType")
    private Integer valueType;

    @Column(name= "MinimumTotalAmount")
    private BigDecimal minimumTotalAmount;

    @Column(name= "Quantity")
    private Integer quantity;

    @Column(name= "Describe")
    private String describe;

    @Column(name= "StartDate")
    private Date startDate;

    @Column(name= "EndDate")
    private Date endDate;

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

//    public String getStatus() {
//        if(status == 0){
//            return "CHUA_HOAT_DONG";
//        }else if(status == 1){
//            return "DANG_HOAT_DONG";
//        }else if(status == 2){
//            return "HET_KHUYEN_MAI";
//        }else if(status == 3){
//            return "HET_HAN";
//        }else{
//            return "DA_XOA";
//        }
//    }
}
