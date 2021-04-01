import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, description }) => {
  return (
    <div className="card py-3">
      <div className="card-body">
        <Link to={`/${id}`} className="card-title">{title}</Link>
        <p className="card-text mt-3"><i>{description}</i></p>
      </div>
    </div>
  )
}

export default BlogCard;