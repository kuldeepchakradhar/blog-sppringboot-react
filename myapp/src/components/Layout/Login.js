import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import classnames from "classnames";
import { loginUser } from "../../actions/userActions";

class Login extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        // console.log(LoginRequest);

         this.props.loginUser(LoginRequest);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.security.validToken){
            this.props.history.push("/user/profile");
        }
    }

    componentDidMount(){
        if(this.props.security.validToken === true){
            this.props.history.push("/user/profile");
        }
    }

    // componentDidUpdate(nextProps){
    //     if(nextProps.errors){
    //         this.setState({errors: nextProps.errors});
    //     }
    // }


    render() {

        const { errors } = this.state;
        return (
            <div className="limiter">
                <div className="container-form-body">
                    <div className="form-login">
                    <span className="form-header">Login</span>
                        <form onSubmit={this.onSubmit} >
                            <div className="form-group">
                                <input type="email" className={classnames("form-control input100",{
                                    "is-invalid": errors.username
                                })}
                                    placeholder="Enter email"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                                {errors.username && (
                                    <div className="invalid-feedback text-left">{errors.username}</div>
                                )}
                            </div>

                            <div className="form-group">
                            <input type="password" className={classnames("form-control input100",{
                                "is-invalid": errors.password
                            })}
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback text-left">{errors.password}</div>
                                )}
                            </div>
                            <Link to="/password-reset" className="forgot-password" >forgot password</Link><br />

                            <input type="submit" value="Login" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const matStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(matStateToProps, {loginUser})(Login);
