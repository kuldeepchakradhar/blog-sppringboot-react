package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "PostId can not be blank")
    @Size(max = 6, min = 4, message = "Post id should 4-6 character long")
    @Column(unique = true, updatable = false)
    private String postId;

    @NotBlank(message = "Post Title is required")
    @Size(min = 40, max = 60, message = "title should be 40-60 character long")
    private String title;

    private String description;

    @NotBlank(message = "Blog conent can not be blank")
    private String content;

    private Date publish_at;

    private Date update_at;

    private String author;

    private boolean status = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    @JsonIgnore
    private User user;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "post")
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    private String userImg;


    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public Post(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getPublish_at() {
        return publish_at;
    }

    public void setPublish_at(Date publish_at) {
        this.publish_at = publish_at;
    }

    public Date getUpdate_at() {
        return update_at;
    }

    public void setUpdate_at(Date update_at) {
        this.update_at = update_at;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getUserImg() {
        return userImg;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }

    @PrePersist
    protected void onCreate(){
        this.publish_at = new Date();
    }

    @PreUpdate
    protected void onUpdate(){
        this.update_at = new Date();
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj)
            return true;
        if(!(obj instanceof Post))
            return false;

        return id != null && id.equals(((Post) obj).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

}
