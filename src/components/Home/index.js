import { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from '../Header';
import Footer from '../Footer';
import './index.css';

class Home extends Component {
  state = { postLists: [] };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = async () => {
    const jwtToken = Cookies.get('token');
    const url = 'https://zuai-backend-jr67.onrender.com/posts/';
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        this.setState({ postLists: data });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  onClickAddPost = () => {
    const { history } = this.props;
    history.push('/addpost');
  };

  onDeletePost = async (id) => {
    const jwtToken = Cookies.get('token');
    const url = `https://zuai-backend-jr67.onrender.com/posts/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        this.getPosts();
      } else {
        console.error('Failed to delete post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  render() {
    const { postLists } = this.state;
    const jwtToken = Cookies.get('token');

    if (jwtToken === undefined) {
      const { history } = this.props;
      history.replace('/login');
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <button className="add-post-button" type="button" onClick={this.onClickAddPost}>
            ADD POST
          </button>
          {postLists.length > 0 ? (
            <ul>
              {postLists.map((eachPost) => (
                <li className="post-list-container" key={eachPost.id}>
                  <Link className="list" to={`/posts/${eachPost.id}`}>
                    <h1 className="post-title">TITLE: {eachPost.title}</h1>
                    <hr />
                    <p className="post-created" style={{color:"red"}} >Created at: {eachPost.created_at}</p>
                    <p className="post-content">CONTENT: {eachPost.content}</p>
                  </Link>
                  <div className="post-actions">
                    <button
                      className="edit-button"
                      onClick={() => this.props.history.push(`/editpost/${eachPost.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => this.onDeletePost(eachPost.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{color:"white"}} >No posts available.</p>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
