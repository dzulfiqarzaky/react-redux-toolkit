import './App.css';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import PostsList from './app/features/posts/PostsList';
import AddPostForm from './app/features/posts/AddPostForm';
import SinglePostPage from './app/features/posts/SinglePostPage';
import EditPostForm from './app/features/posts/EditPostForm';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<PostsList />} />

                <Route path='post'>
                    <Route index element={<AddPostForm />} />
                    <Route path='edit/:id' element={<EditPostForm />} />
                    <Route path=':id' element={<SinglePostPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
