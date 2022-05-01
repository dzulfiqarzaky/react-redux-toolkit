import { selectAllUsers, getUsersError, getUsersStatus } from '../users/userSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import TimeAgo from './TimeAgo';
import ReactionButton from './ReactionButton';

const PostsExcerpt = ({ post }) => {
    const users = useSelector(selectAllUsers);
    const status = useSelector(getUsersStatus);
    const error = useSelector(getUsersError);

    let text;
    if (status === 'idle') {
        text = 'Loading...';
    } else if (status === 'succeeded') {
        text = users.find((user) => user.id == post.userId).name;
    } else if (status === 'failed') {
        text = error;
    }

    return (
        <article className='card-post'>
            <h2>{post.title}</h2>
            <p>{post && post.body.substring(0, 75)}...</p>
            <div className='card-readmore'>
                <Link to={`/post/${post.id}`}>
                    <p>Read more</p>
                </Link>
                <TimeAgo timestamp={post.date} />
                <em>by {text}</em>
            </div>
            <ReactionButton post={post} />
        </article>
    );
};

export default PostsExcerpt;
