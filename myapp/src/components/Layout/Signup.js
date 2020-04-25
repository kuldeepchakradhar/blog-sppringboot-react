import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { userRegistraion } from "../../actions/userActions";

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            fullname: "",
            password: "",
            confirmPassword: "",
            errors: {}

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            fullname: this.state.fullname,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        // console.log(newUser);
        this.props.userRegistraion(newUser, this.props.history);
        
    }

    componentDidMount(){
        if(this.props.security.validToken === true){
            this.props.history.push("/");
        }
    }


    render() {
        const { errors } = this.props;
        return (
            <div>
            <div className="limiter">
                <div className="container-form-body"> 
                    <div className="form-login">
                        <form onSubmit={this.onSubmit}>
                            <span  className="form-header">Sign up</span>
                            
                            <div className="form-group">
                                <input type="email" className={classnames("form-control input100" ,{
                                    "is-invalid": errors.username
                                })} 
                                name="username"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.onChange}
                                 />
                                 {
                                     errors.username && (
                                         <div className="invalid-feedback text-left">{errors.username}</div>
                                     )
                                 }
                            </div>
                            <div className="form-group">
                                <input type="text" className={classnames("form-control input100" ,{
                                    "is-invalid":errors.fullname
                                })} 
                                name="fullname"
                                placeholder="Enter your fullname"
                                value={this.state.fullname}
                                onChange={this.onChange}
                                 />
                                 {
                                     errors.fullname && (
                                         <div className="invalid-feedback text-left">{errors.fullname}</div>
                                     )
                                 }
                            </div>
                            <div className="form-group">
                                <input type="password" className={classnames("form-control input100", {
                                    "is-invalid":errors.password
                                })} 
                                name="password"
                                placeholder="Enter valid password"
                                value={this.state.password}
                                onChange={this.onChange}
                                 />
                                 {errors.password && (
                                     <div className="invalid-feedback text-left">{errors.password}</div>
                                 )}
                            </div>
                            <div className="form-group">
                                <input type="password" className={classnames("form-control input100" ,{
                                    "is-invalid":errors.confirmPassword
                                })}
                                name="confirmPassword"
                                placeholder="confirm password"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                                 />
                                {errors.confirmPassword && (
                                    <div className="invalid-feedback text-left">{errors.confirmPassword}</div>
                                )}
                            </div>

                            <input type="submit" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}


Signup.propTypes = {
    userRegistraion: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, {userRegistraion})(Signup);
