package com.example.demo.service.serviceiplm;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageCloud {
    @Autowired
    Cloudinary config;
    public String saveImage(MultipartFile multipartFile) throws IOException {
        return config.uploader()
                .upload(multipartFile.getBytes(),
                        (Map.of("public_id", UUID.randomUUID().toString(), "folder", "image")))
                .get("url")
                .toString();
    }

}
