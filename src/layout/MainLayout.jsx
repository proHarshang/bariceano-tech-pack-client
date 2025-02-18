import { useLocation } from 'react-router-dom';
import MainHeader from '../common/main-header';

const MainLayout = ({ children }) => {

    const { pathname } = useLocation();
    const isPageNotFound = pathname === '/404'; // Ensure your route uses "/404"

    const shouldDisplayNavbar = !['/', '/logout'].includes(pathname) &&
        !pathname.startsWith('/preview') &&
        !isPageNotFound;

    return (
        <>
            {shouldDisplayNavbar && <MainHeader />}
            {children}
            {/* {shouldDisplayFooter && <Footer />} */}
        </>
    );
};

export default MainLayout;
