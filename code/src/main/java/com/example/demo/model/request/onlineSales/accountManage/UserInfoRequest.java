package com.example.demo.model.request.onlineSales.accountManage;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class UserInfoRequest {
    private Long id;

    private String fullName;
    private AccountInfoRequest account;
//    private String birthday;
    private Boolean gender;
    private String avatar;


}
