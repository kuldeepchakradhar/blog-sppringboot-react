import React, { Component } from 'react';
import logo from "../../../src/logo.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/userActions";

class Header extends Component {

    logout() {
        this.props.logout();
        window.location.href = "/login";
    }

    render() {

        const { validToken, user } = this.props.security;

        const usreIsValidToken = (

            <div>
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link " to="/user/profile">
                                {user.fullname}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}>
                                Logout
                                         </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
        const userIsNotValidToken = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link " to="/signup">
                            Sign up
                                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                                         </Link>
                    </li>
                </ul>
            </div>
        );

        const postdisplay = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active" >
                    <Link className="nav-link" to="/user/add/post">Add Post</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/user/post/all">All Post</Link>
                </li>

            </ul>
        );

        let headers;
        let postData;
        if (validToken && user) {
            headers = usreIsValidToken;
            postData = postdisplay;
        } else {
            headers = userIsNotValidToken;
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="/"><img src={logo} className="App-logo" alt="logo" /></a>
                             
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        
                        {postData}
                    </div>


                    {headers}
                </nav>
            </div>
        )
    }
}

Header.propTypes = {
    security: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    security: state.security,
});
export default connect(
    mapStateToProps,
    { logout }
)(Header);