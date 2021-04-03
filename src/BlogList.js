import React from 'react';
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';

const BlogList = () => {
  const posts = useSelector(store => store.blogPosts);

  return (
    <div className="container">
      <div className="row justify-content-between">
        {Object.keys(posts).map(key => (
          <div key={key} className="col-6 mb-5">
            <BlogCard key={key} id={key} title={posts[key].title} description={posts[key].description}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList;