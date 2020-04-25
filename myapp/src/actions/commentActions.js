import axios from 'axios';
import { GET_ERRORS } from './types';

export const addComment = (new_comment, post_id) => async dispatch => {

    try {
        await axios.post(`http://localhost:8082/api/blog/${post_id}/comment`,new_comment);
        
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

    } catch (err) {
        
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};