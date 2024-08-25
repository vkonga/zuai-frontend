import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header';
import './index.css'

class EditPost extends Component {
  state = {
    title: '',
    content: '',
    error: null,
  };

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
        this.setState({ title: post.title, content: post.content });
      } else {
        this.setState({ error: 'Failed to fetch post details' });
      }
    } catch (error) {
      this.setState({ error: 'Error fetching post details' });
    }
  };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeContent = (event) => {
    this.setState({ content: event.target.value });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { match, history } = this.props;
    const { id } = match.params;
    const createdAt = new Date().toISOString()
    const { title, content } = this.state;
    const jwtToken = Cookies.get('token');

    const url = `https://zuai-backend-jr67.onrender.com/posts/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content,id,createdAt }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        history.push(`/posts/${id}`);
      } else {
        this.setState({ error: 'Failed to update post' });
      }
    } catch (error) {
      this.setState({ error: 'Error updating post' });
    }
  };

  render() {
    const { title, content, error } = this.state;

    return (
      <>
        <Header />
        <div className="edit-post-container">
          <h1 className='edit-heading' >Edit Post</h1>
          {error && <p className="error-message">{error}</p>}
          <form className='form-container' onSubmit={this.onSubmitForm}>
            <div className="form-group">
            
              <textarea
                type="text"
                id="title"
                value={title}
                onChange={this.onChangeTitle}
                className='edit-text'
                required
              ></textarea>
            </div>
            <div className="form-group">
              
              <textarea
                id="content"
                value={content}
                onChange={this.onChangeContent}
                rows="10"
                className='edit-text'
                required
              />
            </div>
            <button className="form-button" type="submit">
              Update Post
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default EditPost;
