package com.example.demo.service;

import com.example.demo.model.ImageModel;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public interface ImageModelService {
    ImageModel storeFile(MultipartFile file, String username) throws IOException;

    ImageModel findImageByUserId(Long id, String name);

}
