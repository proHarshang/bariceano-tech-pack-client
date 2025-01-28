import { useLogout } from '../hooks/useLogout';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const handleLogout = () => {
        logout();
    }

    return (
        <div className="bg-[#F1F3F8] w-full h-screen pt-0">
            <h1 className="text-center text-3xl font-bold pt-20 pb-5">LOGOUT</h1>
            <div className="bg-[#D6E0F0]  text-black p-14 rounded-lg max-w-md mx-auto">
                <p className="text-center text-xl font-medium mb-12">Are you sure you want to logout?</p>
                <div className="flex justify-around">
                    <button onClick={handleLogout} className="text-white font-bold bg-[#393B44] py-1 px-[50px] rounded" >
                        Yes
                    </button>
                    <button onClick={() => navigate(`/`)} className="bg-[#393B44] text-white font-bold py-1 px-[50px] rounded" >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Logout