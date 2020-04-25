import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import { deletePost } from '../../actions/postActions';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class ListPost extends Component {

    componentDidMount() {

        this.props.getPosts();

    }

    onDeletePost = id => {
        this.props.deletePost(id);
    }

    render() {

        const { posts } = this.props.posts;

        // const listPostItem = posts.map(post => (
        //     <PostItem key={post.id} post={post} />
        // ));

        const groupList = posts.map(group => {
            return <tr>
                <td>{group.postId}</td>
                <td>{group.title}</td>
                <td>{group.description}</td>
                <td>

                    <Link to={`/user/update/${group.postId}`} color="primary btn btn-primary" >Edit</Link>
                    <p onClick={this.onDeletePost.bind(this, group.postId)}>Delete</p>
                    <Link to={`/post/${group.postId}/${group.title}`} >read more</Link>

                </td>
            </tr>
        }

        );

        return (
            <div>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            
                        </div>
                        <div className="col-md-8" style={{ paddingTop: "20px" }}>
                            {listPostItem}
                            
                        </div>
                        <div className="col-md-2">
                            
                        </div>
                    </div>
                </div> */}

                {/* table data here */}
                <div className="container">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Post Id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupList}

                        </tbody>

                    </Table>
                </div>
            </div>
        )
    }

}

ListPost.propTypes = {
    posts: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    posts: state.post
});

export default connect(mapStateToProps, { getPosts, deletePost })(ListPost);
