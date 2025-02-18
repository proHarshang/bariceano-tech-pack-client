import { useLocation } from 'react-router-dom';
import MainHeader from '../common/main-header';
// import Footer from '../common/Footer';


const MainLayout = ({ children }) => {

    const { pathname } = useLocation();

    const shouldDisplayNavbar = !['/', '/logout'].includes(pathname) && !/^\/preview\/[^/]+$/.test(pathname);

    return (
        <>
            {shouldDisplayNavbar && <MainHeader />}
            {children}
            {/* {shouldDisplayFooter && <Footer />} */}
        </>
    );
};

export default MainLayout;
