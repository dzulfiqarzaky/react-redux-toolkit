import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, deletePost } from './postsSlice';
import { selectAllUsers } from '../users/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

const SinglePostPage = () => {
    const users = useSelector(selectAllUsers);
    const { id } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(id)));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!post) {
        return <div>post not found</div>;
    }
    let text;

    if (!users) {
        text = 'Loading...';
    } else if (Boolean(users && post)) {
        text = users.find((user) => user.id == post.userId).name;
    } else {
        text = 'error';
    }

    const handleDelete = () => {
        try {
            dispatch(deletePost({ id: post.id })).unwrap();
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='singlePost'>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>
                <TimeAgo timestamp={post.date} />
            </p>
            <p>
                <em>by {text}</em>
            </p>
            <div className='action-btn'>
                <Link to={`/post/edit/${post.id}/`}>
                    <button className='edit'>Edit</button>
                </Link>
                <button className='delete' onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <ReactionButton post={post} />
        </div>
    );
};

export default SinglePostPage;
