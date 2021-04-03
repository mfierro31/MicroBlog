import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Home from './Home';
import PostForm from './PostForm';
import BlogPost from './BlogPost';
import BlogContext from './contexts/blogContext';
import { v4 as uuid } from 'uuid';

const Routes = () => {
  const [blogPosts, setBlogPosts] = useState(JSON.parse(window.localStorage.getItem('blogPosts')) || {});
  const history = useHistory();

  const addBlogPost = post => {
    const newPostId = uuid();
    const newPost = { 
      ...post, 
      comments: {} 
    };
    const updatedPosts = { ...blogPosts, [newPostId]: newPost };
    setBlogPosts(updatedPosts);
    window.localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  }

  const editBlogPost = (post, id) => {
    const blogPostsCopy = { ...blogPosts };
    
    blogPostsCopy[id].title = post.title;
    blogPostsCopy[id].description = post.description;
    blogPostsCopy[id].body = post.body;

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
  }

  const deleteBlogPost = (postId) => {
    const blogPostsCopy = { ...blogPosts };
    
    delete blogPostsCopy[postId];

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
    history.push("/");
  }

  const addComment = (postId, text) => {
    const blogPostsCopy = { ...blogPosts };
    const blogPost = blogPostsCopy[postId];
    const commentId = uuid();

    blogPost.comments[commentId] = text;

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
  }

  const deleteComment = (postId, commentId) => {
    const blogPostsCopy = { ...blogPosts };
    const blogPost = blogPostsCopy[postId];

    delete blogPost.comments[commentId];

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
  }

  return (
    <BlogContext.Provider value={{ blogPosts, addBlogPost, editBlogPost, deleteBlogPost, addComment, deleteComment }}>
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
    </BlogContext.Provider>
  )
}

export default Routes;