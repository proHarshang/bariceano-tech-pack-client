import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const { login, validCredentials } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const user = validCredentials.find(cred => cred.email === email && cred.password === password);

        if (user) {
            login(user);
            navigate('/tech-pack-data');
        } else {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="bg-[#F1F3F8] w-full h-screen pt-0">
            <h1 className="text-center text-3xl font-bold pt-20 pb-5">TechPacks Word</h1>
            <div className="bg-[#D6E0F0] text-white p-8 rounded-lg max-w-md mx-auto">
                <form className="space-y-6" onSubmit={(e) => handleLogin()} >
                    <div>
                        <label className="block text-sm font-medium mb-2 text-black" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2.5 border border-gray-700 rounded-md bg-[#8D93AB] focus:border-indigo-500 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center content-center gap-5">
                        <div className="relative w-full">
                            <label className="block text-sm text-black font-medium mb-2" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2.5 border border-gray-700 rounded-md bg-[#8D93AB] focus:border-indigo-500 focus:ring-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="w-fit border bg-black text-white px-4 py-2">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;