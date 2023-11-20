package com.example.demo.model.response.onlineSales;

import com.example.demo.entity.Category;
import com.example.demo.entity.Color;
import com.example.demo.entity.Material;
import com.example.demo.entity.Size;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class OlHomeDataFillRespone {


    private List<Category> categoryList;

    private List<Color> colorList;

    private List<Size> sizeList;

    private List<Material> materialList;


}
