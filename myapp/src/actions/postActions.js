import axios from 'axios';
import { GET_ERRORS, GET_POSTS, GET_POST, DELETE_POST } from './types';


export const addPost = (newPost, history) => async dispatch => {

    try {
        await axios.post("http://localhost:8082/api/blog/create", newPost);
        history.push("/user/post/all");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }

};

export const getPosts = () => async dispatch => {
        const res = await axios.get("http://localhost:8082/api/blog/all");
    
        
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
};

export const getPost = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8082/api/blog/${id}`);
        dispatch({
            type:GET_POST,
            payload: res.data
        });    
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
    

};

export const deletePost = id => async dispatch => {
    
    if(window.confirm("are you sure want to delete this post")){
        await axios.delete(`http://localhost:8082/api/blog/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
    }
        
    
};