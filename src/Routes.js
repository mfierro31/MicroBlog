import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Home from './Home';
import PostForm from './PostForm';
import BlogPost from './BlogPost';
import BlogContext from './contexts/blogContext';
import { v4 as uuid } from 'uuid';

const Routes = () => {
  const [blogPosts, setBlogPosts] = useState(JSON.parse(window.localStorage.getItem('blogPosts')) || []);
  const history = useHistory();

  const addBlogPost = post => {
    const updatedPosts = [...blogPosts, { ...post, id: uuid(), comments: [] }];
    setBlogPosts(updatedPosts);
    window.localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
  }

  const editBlogPost = (post, id) => {
    const blogPostsCopy = [...blogPosts];
    const blogPostIdx = blogPostsCopy.findIndex(p => p.id === id);
    const blogPost = blogPostsCopy[blogPostIdx];

    blogPost.title = post.title;
    blogPost.description = post.description;
    blogPost.body = post.body;

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
  }

  const deleteBlogPost = (postId) => {
    const blogPostsCopy = [...blogPosts];
    const blogPostIdx = blogPostsCopy.findIndex(p => p.id === postId);
    blogPostsCopy.splice(blogPostIdx, 1);

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
    history.push("/");
  }

  const addComment = (postId, text) => {
    const blogPostsCopy = [...blogPosts];
    const blogPost = blogPostsCopy.find(p => p.id === postId);
    blogPost.comments.push({ id: uuid(), text });

    setBlogPosts(blogPostsCopy);
    window.localStorage.setItem('blogPosts', JSON.stringify(blogPostsCopy));
  }

  const deleteComment = (postId, commentId) => {
    const blogPostsCopy = [...blogPosts];
    const blogPost = blogPostsCopy.find(p => p.id === postId);

    const commentIdx = blogPost.comments.findIndex(c => c.id === commentId);
    blogPost.comments.splice(commentIdx, 1);

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