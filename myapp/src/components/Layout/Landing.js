import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPublicsPosts } from '../../actions/publicAtions';
import PublicPostList from '../PublicPost/PublicPostList';



class Landing extends Component {

    componentDidMount() {
        this.props.getPublicsPosts();
    }
    render() {

        const { publicPosts } = this.props.publicPosts;

        const listPulblicPost = publicPosts.map(publicPost => (
            <PublicPostList key={publicPost.id} publicPost={publicPost} />
        ));

        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        {/* frist */}
                    </div>
                    <div className="col-md-8" style={{ paddingTop: "20px" }}>

                        {/* <PublicPostList /> */}
                        {listPulblicPost}
                    </div>
                    <div className="col-md-2">
                        {/* third */}
                    </div>
                </div>
            </div>

        )
    }
}

Landing.propTypes = {
    publicPosts: PropTypes.object.isRequired,
    getPublicsPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    publicPosts: state.publicPost
});
export default connect(mapStateToProps, { getPublicsPosts })(Landing);
