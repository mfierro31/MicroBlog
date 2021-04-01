import React, { useContext } from 'react';
import BlogContext from './contexts/blogContext';
import BlogCard from './BlogCard';

const BlogList = () => {
  const { blogPosts: posts } = useContext(BlogContext);

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