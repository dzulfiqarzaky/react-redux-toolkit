import { useDispatch } from 'react-redux';
import { postReaction } from './postsSlice';

const reactionLike = {
    like: '👍',
    dislike: '👎',
};

const ReactionButton = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButton = Object.entries(reactionLike).map(([name, emoji]) => {
        return (
            <button
                className='emoji-btn'
                key={name}
                onClick={() => dispatch(postReaction({ postId: post.id, reaction: name }))}>
                {emoji} {post.reactions[name]}
            </button>
        );
    });
    return <div>{reactionButton}</div>;
};

export default ReactionButton;
