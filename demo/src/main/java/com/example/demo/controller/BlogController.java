package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/public/")
public class BlogController {

    @Autowired
    private PostService postService;

    @GetMapping("/blog/all")
    public Iterable<Post> getAllPosts(){
        return postService.getAllPostData();

    }

    @GetMapping("/blog/{id}")
    public ResponseEntity<?> getPostById(@PathVariable String id){

        Post post = postService.getOnePostByIdentifier(id);

        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }
}
