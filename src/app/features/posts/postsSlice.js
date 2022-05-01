import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
    try {
        const response = await axios.post(POSTS_URL, post);
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
    try {
        const response = await axios.put(`${POSTS_URL}/${post.id}`, post);
        return response.data;
    } catch (err) {
        // return err.message;
        return post; // return the post object if the update failed fake api
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (post) => {
    try {
        const response = await axios.delete(`${POSTS_URL}/${post.id}`);
        if (response.status === 200) return post;
        return `${response.status} ${response.statusText}`;
    } catch (err) {
        return err.message;
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },

            prepare(title, content, userId) {
                return {
                    payload: {
                        title,
                        content,
                        id: nanoid(),
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            like: 0,
                            dislike: 0,
                        },
                    },
                };
            },
        },

        postReaction(state, action) {
            const { postId, reaction } = action.payload;
            const post = state.posts.find((post) => post.id === postId);
            if (post) post.reactions[reaction] += 1;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })

            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        like: 0,
                        dislike: 0,
                    };
                    return post;
                });
                state.posts = loadedPosts;
            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addNewPost.fulfilled, (state, action) => {
                const newPost = {
                    ...action.payload,
                    userId: Number(action.payload.userId),
                    body: action.payload.body,
                    date: new Date().toISOString(),
                    reactions: {
                        like: 0,
                        dislike: 0,
                    },
                };
                state.posts.push(newPost);
            })

            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) return;
                const { id, title, body, userId } = action.payload;
                const post = state.posts.find((post) => post.id === id);
                if (post) {
                    post.title = title;
                    post.body = body;
                    post.userId = userId;
                }
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) return;
                const posts = state.posts.filter((post) => post.id !== action.payload.id);
                state.posts = posts;
            });
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostById = (state, id) => state.posts.posts.find((post) => post.id === id);
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { addPost, postReaction } = postsSlice.actions;

export default postsSlice.reducer;
