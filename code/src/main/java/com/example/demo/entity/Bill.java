package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
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

    @Column(name = "Code", nullable = false, length = 50)
    private String code;

    @Column(name = "CreatedAt", nullable = false)
    private Date createdAt;

    @Column(name = "PaymentDate")
    private Date paymentDate;

    @Column(name = "TotalAmount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "TotalAmountAfterDiscount", nullable = false)
    private BigDecimal totalAmountAfterDiscount;

    @Column(name = "ReciverName", nullable = false, length = 50)
    private String reciverName;

    @Column(name = "DeliveryDate")
    private Date deliveryDate;

    @Column(name = "ShippingFee", nullable = false)
    private BigDecimal shippingFee;

    @Column(name = "Address", columnDefinition = "nvarchar(max)")
    private String address;

    @Column(name = "PhoneNumber", nullable = false, length = 15)
    private String phoneNumber;

    @Column(name = "Note", columnDefinition = "nvarchar(max)")
    private String note;

    @ManyToOne
    @JoinColumn(name = "IdCustomer", nullable = false)
    private CustomerEntity customerEntity;

    @ManyToOne
    @JoinColumn(name = "IdEmployee", nullable = false)
    private Employees employee;

    @ManyToOne
    @JoinColumn(name = "IdPaymentMethod", nullable = false)
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "IdAddress", nullable = false)
    private AddressEntity addressEntity;

    @ManyToOne
    @JoinColumn(name = "IdVoucher", nullable = false)
    private Vouchers voucher;

    @Column(name = "Status", nullable = false)
    private int status;
}