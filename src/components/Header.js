import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <Link to='/'>
                <h1>Blogger</h1>
            </Link>
            <nav>
                <ul className='headerUl'>
                    <li>
                        <Link to='/'>posts</Link>
                    </li>
                    <li>
                        <Link to='post'>create post</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
