package com.example.demo.model.request.product;

import com.example.demo.entity.Image;
import com.example.demo.entity.ProductDetail;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ProductDetailRequest {
    private ProductDetail productDetail;
    private List<Image> imagesList;
}
