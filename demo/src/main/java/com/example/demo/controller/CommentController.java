package com.example.demo.controller;

import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.service.CommentService;
import com.example.demo.service.MapValidationErrorService;
import com.example.demo.service.PostService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/blog")
public class CommentController {

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("/{post_id}/comment")
    public ResponseEntity<?> addComment(@Valid @PathVariable String post_id,
                                        @RequestBody Comment comment,
                                        @RequestParam(value = "parent_id", defaultValue = "") Long parent_id,
                                        BindingResult result,
                                        Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(result);
        if(errorMap != null) return errorMap;

        Post post = postService.getPostByIdentifier(post_id, principal.getName());

        Comment comment1 = commentService.addNewComment(post, parent_id, comment, principal.getName());

        return new ResponseEntity<Comment>(comment1, HttpStatus.CREATED);
    }

    @GetMapping("/{post_id}/comment")
    public Iterable<Comment> getAllComment(@PathVariable String post_id, Principal principal){

        Post post = postService.getPostByIdentifier(post_id, principal.getName());
        Long postId = post.getId();

        return commentService.findAllByCid(postId);

    }
    
    @GetMapping("/{post_id}/comm")
    public Iterable<Comment> getComments(){
        
    }


}
