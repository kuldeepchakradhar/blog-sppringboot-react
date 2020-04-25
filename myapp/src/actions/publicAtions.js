import axios from 'axios';
import { GET_PUBLIC_POST, GET_PUBLIC_POST_ONE, GET_ERRORS } from './types';


export const getPublicsPosts = () => async dispatch => {

    const res = await axios("http://localhost:8082/public/blog/all");

    dispatch({
        type: GET_PUBLIC_POST,
        payload: res.data
    });

};

export const getPublicPost = (id) => async dispatch => {

    try {
        const res = await axios(`http://localhost:8082/public/blog/${id}`);
        dispatch({
            type: GET_PUBLIC_POST_ONE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};
