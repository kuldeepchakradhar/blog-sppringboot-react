package com.example.demo.service.impl;

import com.example.demo.exceptions.PostAlreadyExistException;
import com.example.demo.model.Post;
import com.example.demo.model.User;
import com.example.demo.repository.PostRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;


    @Override
    public Post createOrUpdateNewPost(Post post, String username) {

        if(post.getId() != null){
            Post post1 = postRepository.findByPostId(post.getPostId());

            if(post1 != null && !post1.getAuthor().equals(username)){
                throw new PostAlreadyExistException("This post is not exist in your account");
            }
            if(post1 == null){
                throw new PostAlreadyExistException("Post with Id "+post.getPostId()+" does not exist");
            }
        }

        try{

            User user = userRepository.findByUsername(username);
            post.setUser(user);
            post.setAuthor(user.getUsername());
            post.setUserImg(user.getImageUrl());
            if(post.getPostId() == null){
                post.setPostId(post.getPostId());
            }
            else{
                post.setTitle(post.getTitle());
                post.setContent(post.getContent());
                post.setDescription(post.getDescription());
            }
            return postRepository.save(post);

        }catch (Exception e){
            throw new PostAlreadyExistException("Post is already Exist with id "+ post.getPostId());
        }
    }

    @Override
    public Iterable<Post> getAllPosts(String username) {
        return postRepository.findAllByAuthor(username);
    }

    @Override
    public Post getPostByIdentifier(String post_id, String username) {
        Post post = postRepository.findByPostId(post_id);

        if(post == null){
            throw new PostAlreadyExistException("Post id '"+post_id+"' does not exist");
        }
        if(!post.getAuthor().equals(username)){
            throw new PostAlreadyExistException("Post is not exist in your account");
        }

        return post;
    }

    @Override
    public void deletePostByPostId(String post_id, String name) {
        postRepository.delete(getPostByIdentifier(post_id, name));
    }



//    below is public rest api

    @Override
    public Iterable<Post> getAllPostData() {
        return postRepository.findByStatusTrue();
    }

    @Override
    public Post getOnePostByIdentifier(String id) {
        return postRepository.findByPostId(id);
    }


}
