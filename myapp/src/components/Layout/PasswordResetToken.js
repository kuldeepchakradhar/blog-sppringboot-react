import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { passrestToken } from '../../actions/userActions';


class PasswordResetToken extends Component {

    constructor(){
        super();

        this.state = {
            passwordOne:"",
            passwordTwo:"",
            token: "",
            errors: {
                passwordOne: '',
                passwordTwo: ''
              }

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

        const{ passwordOne, passwordTwo } = this.state;

        if(passwordOne.length < 6){
            alert("password length must be at least 6 characters");
        }
        else if(passwordOne !== passwordTwo){
            alert("password must match");
        }else{

            const queryString = this.props.location.search
            const urlParams = new URLSearchParams(queryString);
            const token = urlParams.get('token');
            
            const passwordRestToken = {
                passwordOne:this.state.passwordOne,
                token: token
            }
    
           console.log(passwordRestToken);

           this.props.passrestToken(passwordRestToken);
    
        }
         

    }

    render() {
        return (
            <div>
            <div className="limiter">
                <div className="container-form-body">
                    <div className="form-login">
                    <span className="form-header">Password Reset</span>
                        <form onSubmit={this.onSubmit} >
                            <div className="form-group">
                                <input type="password" className="form-control input100"
                                    placeholder="Enter Password"
                                    name="passwordOne"
                                    value={this.state.passwordOne}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control input100"
                                    placeholder="Enter password"
                                    name="passwordTwo"
                                    value={this.state.passwordTwo}
                                    onChange={this.onChange}
                                />
                            </div>


                            <input type="submit" value="submit" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

PasswordResetToken.propTypes = {
    errors: PropTypes.object.isRequired,
    passrestToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps,{passrestToken})(PasswordResetToken);
