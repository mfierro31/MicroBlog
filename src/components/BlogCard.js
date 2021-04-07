import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, description, vote, votes }) => {
  return (
    <div className="card pt-3">
      <div className="card-body">
        <Link to={`/${id}`} className="card-title">{title}</Link>
        <p className="card-text mt-3"><i>{description}</i></p>
      </div>
      <div className="card-footer">
        <small className="mr-3">{votes} {votes === 1 ? "vote" : "votes"}</small>
        <i className="fas fa-thumbs-up text-success mr-3" onClick={() => vote(id, 'up')} />
        <i className="fas fa-thumbs-down text-danger" onClick={() => vote(id, 'down')} />
      </div>
    </div>
  )
}

export default BlogCard;