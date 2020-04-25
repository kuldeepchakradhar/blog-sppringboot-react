package com.example.demo.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/home")
public class UploadController {

    @Autowired
    private AmazonS3 s3client;

    @Value("${endpointUrl}")
    private String endpointUrl;

    @Value("${bucketName}")
    private String bucketName;

    @Autowired
    private UserService userService;

    @PostMapping(value = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadFile(@RequestPart(value="file") MultipartFile multipartFile, Principal principal){

        String fileUrl = "";
        String status = null;

        try{
            // converting multipart file to file
            File file = convertMultipartToFile(multipartFile);
            String filename = multipartFile.getOriginalFilename();
            fileUrl = endpointUrl + "/"+ bucketName + "/images/"+ filename;

            status = uploadFileToS3Bucket(filename, file, principal.getName());
            file.delete();

        } catch (Exception e) {
            return new ResponseEntity<String>("Upload file exception "+e.getMessage(), HttpStatus.OK);
        }

        return new ResponseEntity<String>(status + " " +fileUrl, HttpStatus.OK);
    }

    private File convertMultipartToFile(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convertFile);
        fos.write(file.getBytes());
        fos.close();
        return convertFile;

    }

    private String uploadFileToS3Bucket(String filename, File file , String username){
        try{
//            s3client.putObject(new PutObjectRequest(bucketName, "/images/"+filename, file));
            s3client.putObject(new PutObjectRequest(bucketName, filename, file)
                .withCannedAcl(CannedAccessControlList.PublicRead)
            );


        }catch (AmazonServiceException e){
            return "UploadFileToS3Bucket().uploading failed "+ e.getMessage();
        }

        URL url = s3client.getUrl(bucketName, filename);
        String sharableLink = url.toExternalForm();

        User user = userService.getUsername(username);

        user.setImageUrl(sharableLink);
        userService.saveUserImage(user);

        return "Uploading successfully ";
    }
}
