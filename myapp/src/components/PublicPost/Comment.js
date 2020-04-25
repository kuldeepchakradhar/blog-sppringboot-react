import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/commentActions';


class Comment extends Component {


    constructor(props){
        super(props);

        this.state = {
            commentText: "",
            postId: ""
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

        const commentData = {
            commentText: this.state.commentText,
        };

        let post_id = this.props.postId;
        

        this.props.addComment(commentData, post_id);
    }

    render() {


        return (
            <div>
                <hr />
                <p>Replies</p>
                <br />
                <br />


                            
                <div className="form-group post-comment-data">
                    <Form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                        <textarea
                        className="form-control"
                        name="commentText"
                        value={this.state.commentText}
                        onChange={this.onChange}
                        placeholder="write your comment here"

                        ></textarea>

                        <input type="submit" className="btn btn-primary"/>
                    </Form>
                </div>
            </div>
        )
    }
}

Comment.propTypes = {
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired    
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, {addComment})(Comment);
