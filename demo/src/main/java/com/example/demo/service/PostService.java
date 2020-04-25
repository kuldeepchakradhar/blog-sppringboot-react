package com.example.demo.service;

import com.example.demo.model.Post;

public interface PostService {

    Post createOrUpdateNewPost(Post post, String name);
    Iterable<Post> getAllPosts(String name);

    Post getPostByIdentifier(String post_id, String name);

    Iterable<Post> getAllPostData();

    Post getOnePostByIdentifier(String id);

    void deletePostByPostId(String post_id, String name);
}
