import { Component } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css'
class PostDetails extends Component {
  state = { post: null, error: null };

  componentDidMount() {
    this.getPostDetails();
  }

  getPostDetails = async () => {
    const { match } = this.props;
    const { id } = match.params; // Get post id from URL
    const jwtToken = Cookies.get('token');
    const url = `https://zuai-backend-jr67.onrender.com/posts/${id}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const post = await response.json();
        this.setState({ post });
      } else {
        this.setState({ error: 'Failed to fetch post details' });
      }
    } catch (error) {
      this.setState({ error: 'Error fetching post details' });
    }
  };

  render() {
    const { post, error } = this.state;

    if (error) {
      return <p>{error}</p>;
    }

    if (!post) {
      return <p>Loading...</p>;
    }

    return (
      <>
      <Header />
      <div className='post-details-container' >
        <h1 className='post-title' >{post.title}</h1>
        <p className='post-created'>created at : {post.created_at}</p>
        <p className='post-desc'>{post.content}</p>
        
      </div>
      </>
    );
  }
}

export default PostDetails;
