package com.example.demo.restcontroller.onlineSales;

import com.example.demo.entity.Bill;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin("*")
@RestController
public class testImg {


    @PostMapping("/img/create")
    public ResponseEntity<String> upLoadImg(@RequestParam("images") MultipartFile[] images, @RequestParam("idProductDetail") String idProductDetail) throws IOException {
        // Xử lý các file ảnh ở đây
        // Lưu ý rằng images là một mảng của MultipartFile, có thể lưu hoặc xử lý chúng tùy theo nhu cầu của bạn
        System.out.println(idProductDetail);
        // Ví dụ: lưu các file ảnh vào thư mục trên server
        for (MultipartFile image : images) {
            // Lưu image vào thư mục trên server
            // Để lưu file, bạn có thể sử dụng image.transferTo(new File("đường_dẫn_đến_thư_mục/" + image.getOriginalFilename()));

            System.out.println(image.getName());
        }

        // Trả về response thành công
        return ResponseEntity.ok("Images uploaded successfully");
    }


    }
