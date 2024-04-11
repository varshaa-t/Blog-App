import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, { 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean'],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align'
];

function EditPostPage() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/'+id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                })
            })
    }, [])

    async function updatePost(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        if (response.ok) {
            setRedirect(true);
            toast.success('Post updated!')
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <form onSubmit={updatePost}>
            <input
                type='title'
                placeholder='Title'
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <input
                type='text'
                placeholder='Summary'
                value={summary}
                onChange={event => setSummary(event.target.value)}
            />
            <input
                type='file'
                onChange={event => setFiles(event.target.files)}
            />
            <ReactQuill
                modules={modules}
                formats={formats}
                value={content}
                onChange={newValue => setContent(newValue)}
            />
            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    )
}

export default EditPostPage