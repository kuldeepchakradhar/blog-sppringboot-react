import React, { Component } from 'react';
import { getPublicPost } from '../../actions/publicAtions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import Comment from './Comment';

class PublicPostOne extends Component {


    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getPublicPost(id);
    }
    render() {

        const {publicPost} = this.props.publicPost;
 

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
                                <h3>{publicPost.title}</h3>
                                <p>{publicPost.description}</p>
                                <div className="container">
                                    <FroalaEditorView model={publicPost.content} />
                                    

                                </div>
                                <div className="post-comment">
                                    <Comment postId={publicPost.postId} />
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


PublicPostOne.propTypes = {
    publicPost: PropTypes.object.isRequired,
    getPublicPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    publicPost: state.publicPost
});

export default connect(mapStateToProps, {getPublicPost})
(PublicPostOne);
