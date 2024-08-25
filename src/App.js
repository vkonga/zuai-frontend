import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AddPost from './components/AddPost';
import PostDetails from './components/PostDetails';
import Signup from './components/SignUp';
import Login from './components/Login';
import EditPost from './components/EditPost';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/addpost" component={AddPost} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route exact path="/editpost/:id" component={EditPost} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path = "/footer" component={Footer}  />
      </Switch>
    </Router>
  );
}

export default App;
