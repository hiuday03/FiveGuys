package com.example.demo.payment.vnpay.DTO;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PaymentRestDTO implements Serializable {

    private String status;
    private String message;
    private String URL;

}