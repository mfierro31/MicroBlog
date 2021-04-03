import React, { useContext } from 'react';
import BlogContext from './contexts/blogContext';
import BlogCard from './BlogCard';

const BlogList = () => {
  const { blogPosts: posts } = useContext(BlogContext);

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