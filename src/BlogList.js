import React, { useEffect } from 'react';
import BlogCard from './BlogCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './actionCreators';

const BlogList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const posts = useSelector(store => store.blogPostsMin);

  if (posts.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <div className="row justify-content-between">
        {posts.map(p => (
          <div key={p.id} className="col-6 mb-5">
            <BlogCard key={p.id} id={p.id} title={p.title} description={p.description}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList;