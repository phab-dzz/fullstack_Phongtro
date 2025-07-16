import React  from "react";
import {UserProfile,ChangePassword} from './'


const UserInfo = () => {
    const [role, setRole] = React.useState('user'); 
    
    return (
        <>
            <div className=" w-full">
                <div className="flex items-center justify-start w-full h-[40px] bg-white border-b border-black font-bold px-4">
                   <button className={`${
                        role === 'user' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
                    } hover:text-red-500`} onClick={() => setRole('user')}>
                    Chỉnh sửa thông tin cá nhân
                    </button>
                    <button className={`${
                        role === 'password' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'
                    } hover:text-red-500 ml-4`} onClick={() => setRole('password')}>
                        đổi mật khẩu
                    </button>
                </div>

                <div className="w-full min-h-screen  ">
                    {role === 'user' ? <UserProfile /> : <ChangePassword />}
                </div>
            </div>
        </>
    );
    }
export default UserInfo;