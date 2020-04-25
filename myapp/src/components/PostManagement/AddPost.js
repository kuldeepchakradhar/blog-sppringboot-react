import React, { Component } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Include special components if required.
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';


class AddPost extends Component {

    constructor() {
        super();
        this.state = {
            title: "",
            postId: "",
            author: "",
            status: "",
            description: "",
            content: "",
            errors: {}

        };

        this.onChange = this.onChange.bind(this);
        this.onDataSubmit = this.onDataSubmit.bind(this);

    }

    handleModelChange = (content) => {
        this.setState({ content: content });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    onDataSubmit(e) {
        e.preventDefault();

        const NewPost = {
            title: this.state.title,
            postId: this.state.postId,
            author: this.state.author,
            status: this.state.status,
            description: this.state.description,
            content: this.state.content
        };

        // console.log(NewPost);
        this.props.addPost(NewPost, this.props.history);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }


    render() {
        return (
            <div>
                <div className="post">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="display-4 text-center">Create Post form</p>
                                <hr />
                                <form onSubmit={this.onDataSubmit}>
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
                                            onModelChange={this.handleModelChange}
                                        />

                                    </div>
                                    <div className="form-group">
                                        
                    
                                    </div>

                                    <input
                                        type="submit"
                                        className="btn btn-primary btn-block mt-4"
                                    />
                                </form>
                            </div>
                            <div className="col-md-6">
                                <p className="display-4 text-center">Post body</p>
                                <div>
                                    <FroalaEditorView model={this.state.content} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddPost.propTypes = {
    errors: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addPost})(AddPost);
