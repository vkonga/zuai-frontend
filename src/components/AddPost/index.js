import { Component } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import Header from '../Header';

import './index.css'

class AddPost extends Component {
  state = { title: '', content: '' };

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  onChangeContent = (event) => {
    this.setState({ content: event.target.value });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get('token');
    const { title, content } = this.state;
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const url = 'https://zuai-backend-jr67.onrender.com/post/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ title, content, id, createdAt }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        this.setState({ title: '', content: '' }); // Clear form fields
        const { history } = this.props;
        history.replace('/'); // Redirect to the home page
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { title, content } = this.state;
    return (
    <div className='form-page' >
      <Header />
      <form className='form-container' onSubmit={this.onSubmitForm}>
        <h1>ADD POST</h1>
        <textarea
          placeholder="Enter Title"
          rows={3}
          cols={40}
          value={title}
          onChange={this.onChangeTitle}
          required
          wrap="soft"
        />
        <textarea
          placeholder="Enter Content"
          
          cols={40}
          value={content}
          onChange={this.onChangeContent}
          required
          wrap="soft"
        />
        <button className='form-button' type="submit">ADD</button>
      </form>
    </div>
    );
  }
}

export default withRouter(AddPost);
