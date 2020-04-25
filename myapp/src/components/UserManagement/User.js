import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import {connect } from "react-redux";


class User extends Component {   
    
    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:8082/home/uploadFile",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }



    render() {
        const { user } = this.props.security;
        return (
            <div>
                <div className="container emp-profile">
                <div className="row">
                    <div className="col-md-4">
                        
                        <div className="profile">
                            {/* <img src="https://scontent.fblr5-1.fna.fbcdn.net/v/t1.0-1/p160x160/67585457_2302137996569121_5045439305430859776_o.jpg?_nc_cat=103&_nc_sid=dbb9e7&_nc_ohc=UBola2LlVkkAX8OzmTE&_nc_ht=scontent.fblr5-1.fna&_nc_tp=6&oh=88ffc3c83965ef7ef5e39d646a48638c&oe=5EAEB976" alt=""/> */}
                            <img src={user.imageUrl} alt="" className="user-profile"/>

                            
                            <p>
  <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    edit Image
  </a>

</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
   <div className="file btn btn-lg btn-primary">
                            <form onSubmit={this.onSubmit}>
                             <input type="file" name="file" onChange={this.onChange} /><br />
                             <input type="submit" value="edit Image"/>
                            </form>                             
                            </div>
  </div>
</div>



                         </div>
                        
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {user.fullname}
                                    </h5>
                                    <h6>
                                        Web Developer and Designer
                                    </h6>
                                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link active" id="home-tab" data-toggle="tab" to="#" role="tab" aria-controls="home" aria-selected="true">About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.username}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.fullname}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>123 456 7890</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Web Developer and Designer</p>
                                            </div>
                                        </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
        </div>
            </div>
        )
    }
}

User.propTypes = {
    security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    security: state.security
});
export default connect(
    mapStateToProps,
    null
)(User);
