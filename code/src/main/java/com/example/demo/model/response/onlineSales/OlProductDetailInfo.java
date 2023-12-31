package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.Color;
import com.example.demo.entity.Size;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlProductDetailInfo {


    private OlViewProductDetailRespone olViewProductDetailRespone;

    private List<Color> listOfColor;

    private List<Size> listOfSize;


}
