package com.example.demo.repository;

import com.example.demo.model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {


    Post findByPostId(String postid);

    Iterable<Post> findAllByAuthor(String username);

    Iterable<Post> findByStatusTrue();
}
