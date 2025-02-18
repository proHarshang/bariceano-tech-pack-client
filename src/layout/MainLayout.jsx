import { useLocation } from 'react-router-dom';
import MainHeader from '../common/main-header';
import PageNotFound from '../pages/PageNotFound';

const MainLayout = ({ children }) => {

    const { pathname } = useLocation();

    const shouldDisplayNavbar = !['/', '/logout'].includes(pathname) && !/^\/preview\/[^/]+$/.test(pathname) && !children.type === PageNotFound;

    return (
        <>
            {shouldDisplayNavbar && <MainHeader />}
            {children}
            {/* {shouldDisplayFooter && <Footer />} */}
        </>
    );
};

export default MainLayout;
