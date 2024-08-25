import React, { Component } from 'react';
import {v4 as uuidv4} from 'uuid'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  onChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const id = uuidv4()
    const url = 'https://zuai-backend-jr67.onrender.com/signup';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id,username,password}),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        this.setState({ username: '', password: '', error: '' });
        const { history } = this.props;
        history.push('/login');
      } else {
        
        this.setState({ error: 'Signup failed' });
      }
    } catch (error) {
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    const { username, password,error } = this.state;
    return (
      <form className='form-container' onSubmit={this.onSubmitForm}>
        <h1 className='form-heading' >Signup</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>USERNAME</label>
            <input className='form-input' type="text" value={username} placeholder='Enter username' onChange={this.onChangeUserName} required
            />
          </div>
        <div>
          <label>PASSWORD</label>
            <input className='form-input' type="password" value={password} placeholder='Enter password' onChange={this.onChangePassword} required
            />
        </div>
        <button className='form-button' type="submit">Signup</button>
      </form>
    );
  }
}

export default Signup;
