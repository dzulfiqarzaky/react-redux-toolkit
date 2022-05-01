import { useSelector } from 'react-redux';
import { selectAllUsers } from './userSlice';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map((user) => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ));
    return <div>UsersList</div>;
};

export default UsersList;
