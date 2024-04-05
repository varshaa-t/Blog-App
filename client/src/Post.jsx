import React from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

function Post({_id, title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover}></img>
        </Link>
      </div>
      <div className="texts">
        <h2>
          <Link to={`/post/${_id}`}>
            {title}
          </Link>
        </h2>
        <p className="info">
          <a href="" className="author">{author.email}</a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  )
}

export default Post