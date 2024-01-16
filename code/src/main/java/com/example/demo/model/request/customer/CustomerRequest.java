package com.example.demo.model.request.customer;


import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CustomerEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class CustomerRequest {
    private CustomerEntity customerEntity;
    private AccountEntity accountEntity;
}

