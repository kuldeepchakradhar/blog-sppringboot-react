package com.example.demo.service.impl;

import com.example.demo.model.Comment;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private static final int MAX_COMMENT_LEVEL = 5;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public Comment addNewComment(Post post, Long parentId, Comment comment, String username) {

        if(parentId != null){
            Comment parentComment = commentRepository.findById(comment.getId()).get();

            int level = parentComment.commentLevel();

            comment.setParentComment(level < MAX_COMMENT_LEVEL ? parentComment : parentComment.getParentComment());
        }
        User user = userRepository.findByUsername(username);
        comment.setDateTime(LocalDateTime.now());

        comment.setPost(post);

        comment.setUser(user);

        return commentRepository.saveAndFlush(comment);

    }

    @Override
    public Iterable<Comment> findAllByCid(Long id) {
        return commentRepository.findByPostId(id);
    }

}
