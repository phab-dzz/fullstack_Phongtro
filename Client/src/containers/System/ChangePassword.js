import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { apiChangePassword } from "../../services"; 
const ChangePassword = () => {
    const {currentData} = useSelector(state => state.user);
    console.log("currentUser", currentData);
    
    const [formData, setFormData] = useState({
        phone: currentData?.phone || '',
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    });


    const [showPassword, setShowPassword] = useState({
        password: false,
        newPassword: false,
        confirmNewPassword: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    
    const togglePasswordVisibility = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field]
        });
    };

    const handlesubmitpassword = async (e) => {
        e.preventDefault();
        console.log("formData", formData);
        if (formData.newPassword !== formData.confirmNewPassword) {
            Swal.fire('Error', 'Mật khẩu mới không khớp', 'error');
            return;
        }
        try {
            const response = await apiChangePassword({
                phone: formData.phone,
                password: formData.password,
                newPassword: formData.newPassword
            });
            console.log("response", response);
            if (response.data.err === 0) {
                Swal.fire('Success', 'Mật khẩu đã được thay đổi thành công', 'success');
                setFormData({
                    phone: currentData?.phone || '',
                    password: '',
                    newPassword: '',
                    confirmNewPassword: ''
                });
            } else {
                Swal.fire('Error', response.data.msg, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Đã xảy ra lỗi khi thay đổi mật khẩu', 'error');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-10 ">
            <div className="w-full max-w-md p-6 bg-gray-200 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Đổi Mật Khẩu</h2>
                <div onSubmit={handlesubmitpassword}>
                   
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                        <div className="relative">
                            <input 
                                type={showPassword.password ? "text" : "password"} 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Nhập mật khẩu hiện tại" 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('password')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword.password ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                        <div className="relative">
                            <input 
                                type={showPassword.newPassword ? "text" : "password"} 
                                name="newPassword" 
                                value={formData.newPassword} 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Nhập mật khẩu mới" 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('newPassword')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword.newPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu mới</label>
                        <div className="relative">
                            <input 
                                type={showPassword.confirmNewPassword ? "text" : "password"} 
                                name="confirmNewPassword" 
                                value={formData.confirmNewPassword} 
                                onChange={handleChange} 
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                placeholder="Nhập lại mật khẩu mới" 
                                required 
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmNewPassword')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showPassword.confirmNewPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={handlesubmitpassword}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                        Đổi Mật Khẩu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;