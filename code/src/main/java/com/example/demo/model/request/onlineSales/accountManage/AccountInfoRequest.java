package com.example.demo.model.request.onlineSales.accountManage;

import com.example.demo.entity.Roles;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class AccountInfoRequest {
    private Long id;
//    private String account;
    private String email;
    private String phoneNumber;
    private Roles role;
}
