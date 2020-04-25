package com.example.demo.service;

import com.example.demo.model.Comment;
import com.example.demo.model.Post;

import java.util.List;

public interface CommentService {
    Comment addNewComment(Post post, Long parentId, Comment comment, String username);

    Iterable<Comment> findAllByCid(Long id);

}
