import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/userSlice';

import React from 'react';

const EditPostForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(id)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title);
    const [body, setBody] = useState(post?.body);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        );
    }

    const canSave = Boolean(title && body && userId) && requestStatus === 'idle';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                setRequestStatus('pending');
                dispatch(
                    updatePost({ id: post.id, title, body, userId, reactions: post.reactions })
                ).unwrap();

                setTitle('');
                setBody('');
                setUserId('');
                navigate('/post/' + post.id);
            } catch (error) {
                console.log(error);
            } finally {
                setRequestStatus('idle');
            }
        }
    };

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <div>
            <form className='add-form' onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>User</label>
                <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                    {userOptions}
                </select>
                <label>Content</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
                <button type='submit' disabled={!canSave}>
                    Edit post
                </button>
            </form>
        </div>
    );
};

export default EditPostForm;
