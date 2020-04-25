import React, { Component } from "react";
import FroalaEditor from 'react-froala-wysiwyg';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getPost, addPost } from '../../actions/postActions';

class UpdatePost extends Component {

    constructor(){
        super();

        this.state = {
            id: "",
            postId: "",
            title: "",
            description: "",
            content: "",
            publish_at: "",
            author: "",
            status: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onUpdatePost = this.onUpdatePost.bind(this);

    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onUpdatePost(e){

        e.preventDefault();

        const updatePost = {
            id: this.state.id,
            postId:this.state.postId,
            title: this.state.title,
            description:this.state.description,
            content: this.state.content,
            publish_at: this.state.publish_at,
            author: this.state.author,
            status: this.state.status
        };

        console.log(updatePost);

        this.props.addPost(updatePost, this.props.history);


    }
    

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }

        const {
            id,
            postId,
            title,
            description,
            content,
            publish_at,
            author,
            status
        } = nextProps.post;

        this.setState({
            id,
            postId,
            title,
            description,
            content,
            publish_at,
            author,
            status
        });
    }

    componentDidMount(){
        const { id } = this.props.match.params;

        this.props.getPost(id, this.props.history);
    }


    render() {
        return (
            <div>
                <div className="post">
                    <div className="container">
                        <div className="row">

                            <div class="col-md-2">

                            </div>
                            <div className="col-md-8">
                                <p className="display-4 text-center">Update Post form</p>
                                <hr />
                                <form onSubmit={this.onUpdatePost}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg "
                                            placeholder="Post title"
                                            name="title"
                                            value={this.state.title}
                                            onChange={this.onChange}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Unique Post ID"
                                            name="postId"
                                            value={this.state.postId}
                                            onChange={this.onChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            name="description"
                                            placeholder="Enter Description"
                                            value={this.state.description}
                                            onChange={this.onChange}

                                        />
                                    </div>
                                    <div>
                                                                                
                                        <FroalaEditor
                                            tag='textaread'
                                            config={this.config}
                                            content={this.state.content}
                                            onChange={this.onChange}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <select class="custom-select custom-select-sm"
                                        name="status"
                                        value={this.state.status}
                                        onChange={this.onChange}
                                        >
                                            <option selected>Select the status</option>
                                            <option value="true">Active</option>
                                            <option value="false">Disable</option>
                                        </select>

                                    </div>

                                    <input
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    />
                                </form>
                            </div>
                            <div className="col-md-2">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdatePost.propTypes = {
    post: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired
};

const mapPropsToState = state => ({
    errors: state.errors,
    post: state.post.post
});

export default connect(mapPropsToState ,{getPost, addPost})(UpdatePost);