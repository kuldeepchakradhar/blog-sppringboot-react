package com.example.demo.repository;

import com.example.demo.model.ImageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageModelRepository extends JpaRepository<ImageModel, Long> {
    ImageModel findByUserId(Long id);

    ImageModel findByFilename(String fileName);
}
