import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

class PublicPostList extends Component {
    render() {

        const { publicPost } = this.props;
        return (
            <div>
                <div className="post-item-list">
                    <div className="card">
                        <div className="card-header">
                            {publicPost.title}
                        </div>
                        <div className="card-body">
                            <blockquote class="blockquote mb-0">
                                <FroalaEditorView model={publicPost.content} />
                                {/* <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                                <Link to={`/public/${publicPost.postId}/${publicPost.title}`} >read more</Link>
                            </blockquote>
                        </div>
                        <div className="card-footer text-muted">
                            published at : {publicPost.publish_at}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default PublicPostList;
