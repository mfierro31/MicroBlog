import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import PostForm from './PostForm';
import BlogPost from './BlogPost';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/new">
        <PostForm />
      </Route>
      <Route exact path="/:postId">
        <BlogPost />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes;