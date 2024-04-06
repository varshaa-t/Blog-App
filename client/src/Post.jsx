import React from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

function Post({_id, title, summary, cover, content, createdAt, author }) {

  const userEmail = author.email;
  const parts = userEmail.split('@');
  const username = parts[0];

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
          <a href="" className="author">{username}</a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>
    </div>
  )
}

export default Post