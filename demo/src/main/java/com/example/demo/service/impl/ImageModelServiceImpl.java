package com.example.demo.service.impl;

import com.example.demo.model.ImageModel;
import com.example.demo.model.User;
import com.example.demo.repository.ImageModelRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ImageModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class ImageModelServiceImpl implements ImageModelService {

    @Autowired
    private ImageModelRepository imageModelRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ImageModel storeFile(MultipartFile file, String username) throws IOException {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println("file name is "+ fileName);

        User user = userRepository.findByUsername(username);
        try{
            if(fileName.contains("..")){
                throw new FileNotFoundException("sorry: file contain invalid path");
            }

            ImageModel dbfile = new ImageModel(fileName, file.getContentType(), compressBytes(file.getBytes()));
            System.out.println("dbfile name is "+dbfile);

            dbfile.setUser(user);

            user.setImgUrl(dbfile);
            userRepository.save(user);

            return imageModelRepository.save(dbfile);
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException("file not found catch 1");
        } catch (IOException e) {
            throw new IOException("file not found catch 2");
        }
    }

    @Override
    public ImageModel findImageByUserId(Long id, String name) {

        ImageModel retrieveImage = imageModelRepository.findByUserId(id);
        ImageModel returnImage = new ImageModel(retrieveImage.getFilename(), retrieveImage.getFiletype(), decompressBytes(retrieveImage.getData()));
        return imageModelRepository.findByUserId(id);
    }

    // compressing the image before save to database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new
                ByteArrayOutputStream(data.length);

        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }

        try {
            outputStream.close();
        } catch (IOException e) {
            System.out.println("compressed Image byte size - " +
                    outputStream.toByteArray().length);
        }

        return outputStream.toByteArray();
    }


    public static byte[] decompressBytes(byte[] data){
        Inflater inflater = new Inflater();
        inflater.setInput(data);

        ByteArrayOutputStream outputStream = new
                ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try{
            while(!inflater.finished()){
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        }catch (IOException e){

        }catch (DataFormatException e){

        }

        return outputStream.toByteArray();
    }

}
