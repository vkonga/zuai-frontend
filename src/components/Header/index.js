import {Component} from 'react'
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'; 

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('token'); 
    const { history } = this.props;
    history.replace('/login'); 
  };

  render() {
    return (
      <header className="header">
        <h1 className='header-heading'>POST</h1>
        <div className="header-section">
          <a href='/' className='header-link' >Home</a>
          <a href="/" className="header-link">Contact Us</a>
          <a href="/" className="header-link">Services</a>
        </div>
        <button className="logout-button" onClick={this.onClickLogout}>
          Logout
        </button>
      </header>
    );
  }
}

export default withRouter(Header);
