import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { format } from 'date-fns';

function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        })
      })
  }, [])

  if (!postInfo) return '';

  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
      <div className="author">by @{postInfo.author.username}</div>
      <div className='image'>
        <img src={`http://localhost:4000/${postInfo.cover}`} />
      </div>
      <div className='content' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(postInfo?.content || '')}} />
    </div>
  )
}

export default PostPage