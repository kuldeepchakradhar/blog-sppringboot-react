import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, PASSWORD_REST } from "./types";
import setJwtToken from "../utils/setJwtToken";
import jwt_decode from "jwt-decode";

export const userRegistraion = (newUser, history) => async dispatch => {

    try {
        await axios.post("http://localhost:8082/api/users/create", newUser);
        history.push("/login");
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

export const loginUser = (loginRequest) => async dispatch => {

    try {
        const rest = await axios.post("http://localhost:8082/api/users/login", loginRequest);
        const {token} = rest.data;
        localStorage.setItem("jwtToken", token);

        setJwtToken(token);

        const decodeToken = jwt_decode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decodeToken
        });     
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJwtToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};

export const passwordResetToken = (passReset) => async dispatch => {
 
    try{
       const res = await axios.post("http://localhost:8082/api/users/password-reset-token", passReset);
       console.log(res);
       dispatch({
           type: PASSWORD_REST,
           payload: res.data
       });
    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        });
    }
};

export const passrestToken = (passReset) => async dispatch => {
 
    try{
       const res =   await axios.post("http://localhost:8082/api/users/pass-reset-token", passReset);
       dispatch({
           type: PASSWORD_REST,
           payload: res.data
       });
    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        });
    }
};