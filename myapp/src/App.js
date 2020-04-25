import React from 'react';
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import Header from './components/Layout/Header';
import Login from './components/Layout/Login';
import Signup from './components/Layout/Signup';
import Landing from './components/Layout/Landing';
import setJwtToken from './utils/setJwtToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './actions/types';
import { logout } from './actions/userActions';
import User from './components/UserManagement/User';
import AddPost from './components/PostManagement/AddPost';
import ListPost from './components/PostManagement/ListPost';
import Postone from './components/PostManagement/Postone';
import PublicPostOne from './components/PublicPost/PublicPostOne';
import UpdatePost from './components/PostManagement/UpdatePost';
import PasswordReset from './components/Layout/PasswordReset';
import PasswordResetToken from './components/Layout/PasswordResetToken';

const jwtToken = localStorage.jwtToken;
if(jwtToken){
  setJwtToken(jwtToken);
  const decodeToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodeToken
  });

  
  let currentTime = new Date();

  if(decodeToken.exp < currentTime ){
    store.dispatch(logout());
    window.location.href="/";
  }

 }


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Header />

      <Route exact path="/" component={Landing} />
      <Route exact path="/public/:id/:title" component={PublicPostOne}/>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/user/profile" component={User} />
      <Route exact path="/user/add/post" component={AddPost} />
      <Route exact path="/user/post/all" component={ListPost} />
      <Route exact path="/post/:id/:title" component={Postone} />
      <Route excat path="/user/update/:id" component={UpdatePost} />
      <Route exact path="/password-reset" component={PasswordReset} />
      <Route exact path="/password-reset-token" component={PasswordResetToken} />
    

    </div>
    </Router>
    </Provider>
  );
}

export default App;
