import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    // bisa add header dan footer
    return (
        <>
            <Header />
            <div className='App'>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
