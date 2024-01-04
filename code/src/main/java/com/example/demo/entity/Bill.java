package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name = "Bills")

public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Code")
    private String code;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "PaymentDate")
    private Date paymentDate;

    @Column(name = "TotalAmount")
    private BigDecimal totalAmount;

    @Column(name = "TotalAmountAfterDiscount")
    private BigDecimal totalAmountAfterDiscount;

    @Column(name = "ReciverName")
    private String reciverName;

    @Column(name = "DeliveryDate")
    private Date deliveryDate;

    @Column(name = "ShippingFee")
    private BigDecimal shippingFee;

    @Column(name = "Address")
    private String address;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "Note")
    private String note;

    @ManyToOne
    @JoinColumn(name = "IdCustomer")
    private CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(name = "IdEmployee")
    private Employees employee;

    @ManyToOne
    @JoinColumn(name = "IdPaymentMethod")
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "IdVoucher")
    private Vouchers voucher;

    @Column(name = "typeBill")
    private int typeBill;

//    @Column(name = "PaymentStatus")
//    private int paymentStatus;


//    @ManyToOne
//    @JoinColumn(name = "IdCard")
//    private Cards card;

    @Column(name = "Status")
    private int status;

    @JsonIgnore
    @OneToMany(mappedBy = "bill",  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BillDetail> billDetail;
}