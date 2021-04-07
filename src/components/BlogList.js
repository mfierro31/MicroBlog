import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, voteMin } from '../actions/actionCreators';

const BlogList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector(store => store.blogPostsMin);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getPosts() {
      await dispatch(fetchPosts());
      setIsLoading(false);
    }

    if (isLoading) {
      getPosts();
    }
  }, [dispatch, isLoading]);

  const votePost = (postId, direction) => {
    dispatch(voteMin(postId, direction));
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isLoading && posts.length === 0) {
    return <b>No posts yet!  Please add a new one!</b>;
  }

  return (
    <div className="container">
      <div className="row justify-content-between">
        {posts.map(p => (
          <div key={p.id} className="col-6 mb-5">
            <BlogCard key={p.id} id={p.id} title={p.title} description={p.description} vote={votePost} votes={p.votes} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList;