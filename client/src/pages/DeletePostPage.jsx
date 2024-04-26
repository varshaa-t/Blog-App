import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function DeletePostPage({ openModal }) {

  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);

  async function deletePost(event){
    event.preventDefault();
    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      setRedirect(true);
      toast.success('Post deleted!')
  }
}

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <div className='close-button'>
          <button onClick={() => openModal(false)}> X </button>
        </div>
        <div className='modal-body'>
          <p>Are you sure you want to delete this post? This action cannot be undone and you will be unable to recover this blog post.</p>
        </div>
        <div className='options'>
          <button onClick={() => openModal(false)}>Cancel</button>
          <button id='continue-button' onClick={deletePost}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default DeletePostPage