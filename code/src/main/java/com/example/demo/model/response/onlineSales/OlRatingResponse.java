package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.BillDetail;
import com.example.demo.entity.CustomerEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlRatingResponse {


    private Long id;

    private String content;

    private int rate;


    private Date createdAt;


    private Date updatedAt;

    private boolean rated;


    private Long idCustomer;


    private Long idBillDetail;


    private int status;
}