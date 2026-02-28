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
        <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10 border border-[#E8E2D9]">
            
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold text-black tracking-wide">
                TechPack Generator
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Welcome back. Please login to continue.
              </p>
            </div>
      
            <form className="space-y-6" onSubmit={handleLogin}>
      
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#FAF8F4] focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
      
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#FAF8F4] focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
      
              {/* Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-xl font-medium tracking-wide hover:bg-[#2E2E2E] transition duration-300 shadow-md"
              >
                Sign In
              </button>
            </form>
      
            
          </div>
        </div>
      );
};

export default Auth;