import { SET_CURRENT_USER, PASSWORD_REST } from "../actions/types";

const initialState = {
    user:{},
    validToken: false,
    passwordEmail: {}
};

const booleanValidToken = payload => {
    if(payload){
        return true;
    }else{
        return false;
    }
};


export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
            validToken: booleanValidToken(action.payload),
            user: action.payload
            }
        case PASSWORD_REST:
            return{
                ...state,
                passwordEmail: action.payload
            };
        default:
            return state;   
    }
}