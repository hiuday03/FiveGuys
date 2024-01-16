package com.example.demo.model.request.employee;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Employees;
import com.example.demo.entity.Image;
import com.example.demo.entity.ProductDetail;
import lombok.*;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class EmployeeRequest {
        private Employees employee;
        private AccountEntity accountEntity;

}
