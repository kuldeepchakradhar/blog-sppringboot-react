package com.example.demo.controller;

import com.example.demo.model.Post;
import com.example.demo.service.MapValidationErrorService;
import com.example.demo.service.PostService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/blog")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@Valid @RequestBody Post post, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if(errorMap != null) return errorMap;

        Post post1 = postService.createOrUpdateNewPost(post, principal.getName());

        return new ResponseEntity<Post>(post1, HttpStatus.CREATED);

    }

    @GetMapping("/all")
    public Iterable<Post> getAllPost(Principal principal){

        return postService.getAllPosts(principal.getName());
    }

    @GetMapping("/{post_id}")
    public ResponseEntity<?> getPostById(@PathVariable String post_id, Principal principal){
        Post post = postService.getPostByIdentifier(post_id, principal.getName());
        return new ResponseEntity<Post>(post, HttpStatus.OK);
    }

    @DeleteMapping("/{post_id}")
    public ResponseEntity<?> deletePostById(@PathVariable String post_id, Principal principal){

        postService.deletePostByPostId(post_id, principal.getName());

        return new ResponseEntity<String>("Post id "+post_id+" deleted", HttpStatus.OK);
    }





}
