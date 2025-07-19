import React from "react";
import { UserProfile, ChangePassword } from './';

const UserInfo = () => {
    const [role, setRole] = React.useState('user');
    
    return (
        <>
            <div className="w-full mt-4 mb-4 px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start w-full min-h-[40px] bg-white border-b border-black font-bold px-2 sm:px-4 py-2 sm:py-0">
                    <button 
                        className={`${
                            role === 'user' 
                                ? 'text-red-500 border-b-2 border-red-500' 
                                : 'text-gray-500'
                        } hover:text-red-500 pb-1 sm:pb-0 mb-2 sm:mb-0 text-sm sm:text-base transition-colors duration-200`} 
                        onClick={() => setRole('user')}
                    >
                        Chỉnh sửa thông tin cá nhân
                    </button>
                    
                    <button 
                        className={`${
                            role === 'password' 
                                ? 'text-red-500 border-b-2 border-red-500' 
                                : 'text-gray-500'
                        } hover:text-red-500 sm:ml-4 pb-1 sm:pb-0 text-sm sm:text-base transition-colors duration-200`} 
                        onClick={() => setRole('password')}
                    >
                        Đổi mật khẩu
                    </button>
                </div>
                 
                <div className="w-full min-h-screen bg-gray-50 sm:bg-transparent p-2 sm:p-0">
                    {role === 'user' ? <UserProfile /> : <ChangePassword />}
                </div>
            </div>
        </>
    );
};

export default UserInfo;