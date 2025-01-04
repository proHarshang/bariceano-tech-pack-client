import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../context/AuthContext';
import { MdMenu } from "react-icons/md";

const MainHeader = () => {
    const { user } = useAuth();  // Get user from context

    return (
        <div className="p-5 flex justify-between border-b">
            <div>
            <MdMenu  className='size-8'/>
            </div>
            <div className="flex items-center gap-3 pr-10">
                <CgProfile className="size-9" />
                <div>
                    {user ? (
                        <>
                            <h1>{user.Name}</h1>
                            <h5 className="text-xs">{user.Role}</h5>
                        </>
                    ) : (
                        <h1>Guest</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
