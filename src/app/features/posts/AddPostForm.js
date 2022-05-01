import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/userSlice';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);

    const canSave = Boolean(title && content && userId) && addRequestStatus === 'idle';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                setAddRequestStatus('pending');
                dispatch(addNewPost({ title, body: content, userId })).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
                navigate('/');
            } catch (error) {
                console.log(error);
            } finally {
                setAddRequestStatus('idle');
            }
        }
    };

    return (
        <div>
            <form className='add-form' onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>User</label>
                <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value=''>Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label>Content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />

                <button type='submit' disabled={!canSave}>
                    Add post
                </button>
            </form>
        </div>
    );
};

export default AddPostForm;
