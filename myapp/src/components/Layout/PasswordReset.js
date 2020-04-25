import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
import {passwordResetToken} from '../../actions/userActions';


class PasswordReset extends Component {

    constructor(){
        super();

        this.state = {
            username:"",
            errors:{}
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

        const passReset = {
            username:this.state.username
        };

       this.props.passwordResetToken(passReset);

    
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }


    

    render() {
        const{errors} = this.state;
        const { passwordEmail } = this.props.security;

        const linkSent = (
            <div>
                <p>{passwordEmail.response}</p>
            </div>
        );

        let outputData;

        if(passwordEmail){
            outputData=linkSent;
        }else{
            outputData="";
        }
        
        return (
            <div>
            <div className="limiter">
                <div className="container-form-body">
                    <div className="form-login">
                    <span className="form-header">Password Reset</span>
                        {
                            passwordEmail.response &&
                            (<p className="alert alert-info">{outputData}</p>)
                        }
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
                                {errors.response && (
                                    <div className="invalid-feedback text-right">{errors.response}</div>
                                )}
                                
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

PasswordReset.propTypes = {
    passwordResetToken: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security

});

export default connect(mapStateToProps, {passwordResetToken})(PasswordReset);
