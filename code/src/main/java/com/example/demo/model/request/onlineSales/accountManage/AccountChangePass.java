package com.example.demo.model.request.onlineSales.accountManage;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class AccountChangePass {
    private String username;
    private String newPassword;
}
