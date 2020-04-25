import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


class PostItem extends Component {


    render() {
        const { post } = this.props;
        


        return (
            <div className="post-item-list">
                <div class="card">
                    <div class="card-header">
                        {post.title}
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <FroalaEditorView model={post.content} />
                            
                        </blockquote>
                    </div>
                    <div class="card-footer text-muted">
                        published at : {post.publish_at}
                    </div>

                </div>
            </div>
        )
    }
}

export default PostItem;
