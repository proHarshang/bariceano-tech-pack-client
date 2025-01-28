import { useAuth } from '../context/AuthContext';

export const useLogout = () => {
    const { dispatch } = useAuth()

    const logout = async () => {
        dispatch({ type: 'LOGOUT' });
    }

    return { logout }
}