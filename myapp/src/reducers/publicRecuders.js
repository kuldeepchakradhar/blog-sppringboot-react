import { GET_PUBLIC_POST, GET_PUBLIC_POST_ONE } from "../actions/types";

const initialState = {
    publicPosts: [],
    publicPost: {}
};


export default function(state = initialState, action){
    switch(action.type){
        case GET_PUBLIC_POST:
            return{
                ...state,
                publicPosts: action.payload
            };

        case GET_PUBLIC_POST_ONE:
            return {
                ...state,
                publicPost: action.payload
            };    

        default:
            return state;    
    }
};