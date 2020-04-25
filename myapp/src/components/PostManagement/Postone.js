import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


class Postone extends Component {
    componentDidMount(){
     const { id } = this.props.match.params;  
     this.props.getPost(id); 
    }

    render() {

        const { post } = this.props.post;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <div className="post-title">

                            </div>
                            <div className="post-descrition">
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <div className="container">
                                <FroalaEditorView model={post.content} />
                                </div>
                            </div>
                            <div className="post-body">

                            </div>
                        </div>
                        <div className="col-md-2">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Postone.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    post: state.post
});
export default connect(
    mapStateToProps,
    { getPost }
)(Postone);
