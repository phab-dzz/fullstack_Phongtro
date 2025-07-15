import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera, Edit3, Save, X, User, Phone, MessageCircle, Facebook, Eye, EyeOff, Loader2 } from 'lucide-react';
import { apiUploadImages } from '../../services' // Thay đổi đường dẫn phù hợp
import { use } from 'react';
import * as actions from '../../store/actions'; // Thay đổi đường dẫn phù hợp
import { apiUpdateUser } from '../../services';
import { toast } from 'react-toastify'



const UserProfile = () => {
  const { currentData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const [formData, setFormData] = useState({
    name: currentData.name||'' ,
    phone: currentData?.phone || '',
    zalo: currentData?.zalo || '',
    fbUrl: currentData?.fbUrl || '',
    
    avatar: currentData?.avatar || null
  });
  useEffect(() => {
  if (currentData) {
    setFormData({
      name: currentData.name || '',
      phone: currentData.phone || '',
      zalo: currentData.zalo || '',
      fbUrl: currentData.fbUrl || '',
     
      avatar: currentData.avatar || null
    });
  }
}, [currentData]);
 
  
  const fileInputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAvatarChange = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
        
        const response = await apiUploadImages(formData);
        
        if (response.status === 200) {
          const avatarUrl = response.data?.secure_url;
          setFormData(prev => ({
            ...prev,
            avatar: avatarUrl
          }));
        }
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      // Có thể thêm thông báo lỗi cho user
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSave = async() => {
    // Dispatch action để update user data
    // dispatch(updateUserProfile(formData));
    console.log('Saving user data:', formData);
    const response = await apiUpdateUser(formData);
  console.log('Response from update user:', response);
  console.log('err value:', response?.data?.err);
    if (response && response.data.err=== 0) {
      console.log('User updated successfully:', response);
        toast.success('Cập nhật thông tin cá nhân thành công')
      
    }
    else {
      console.error('Failed to update user:', response);
    }
      setIsEditing(false);


    
  };
  
  const handleCancel = () => {
    setFormData({
      name: currentData?.name || '',
      phone: currentData?.phone || '',
      zalo: currentData?.zalo || '',
      fbUrl: currentData?.fbUrl || '',
    
      avatar: currentData?.avatar || null
    });
    setIsEditing(false);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const getAvatarSrc = () => {
    if (formData.avatar) {
      // Nếu là URL từ Cloudinary hoặc URL khác
      if (typeof formData.avatar === 'string' && (formData.avatar.startsWith('http') || formData.avatar.startsWith('data:'))) {
        return formData.avatar;
      } else if (formData.avatar instanceof Blob) {
        return URL.createObjectURL(formData.avatar);
      }
    }
    return null;
  };
  
  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Thông tin cá nhân</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit3 size={18} />
            Chỉnh sửa
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X size={18} />
              Hủy
            </button>
          </div>
        )}
      </div>
      
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-gray-300">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : getAvatarSrc() ? (
              <img
                src={getAvatarSrc()}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-gray-400" />
            )}
          </div>
          {isEditing && (
            <button
              onClick={triggerFileInput}
              disabled={isLoading}
              className={`absolute bottom-0 right-0 p-2 text-white rounded-full shadow-lg transition-colors ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Camera size={18} />
              )}
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          disabled={isLoading}
        />
        {isEditing && (
          <p className="text-sm text-gray-500 mt-2">
            {isLoading ? 'Đang tải ảnh lên...' : 'Nhấp vào icon camera để thay đổi ảnh đại diện'}
          </p>
        )}
      </div>
      
      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline mr-2" size={16} />
            Họ và tên
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập họ và tên"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{formData.name || 'Chưa cập nhật'}</p>
          )}
        </div>
        
        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline mr-2" size={16} />
            Số điện thoại
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập số điện thoại"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{formData.phone || 'Chưa cập nhật'}</p>
          )}
        </div>
        
        {/* Zalo Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MessageCircle className="inline mr-2" size={16} />
            Zalo
          </label>
          {isEditing ? (
            <input
              type="text"
              name="zalo"
              value={formData.zalo}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập Zalo"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{formData.zalo || 'Chưa cập nhật'}</p>
          )}
        </div>
        
        {/* Facebook URL Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Facebook className="inline mr-2" size={16} />
            Facebook URL
          </label>
          {isEditing ? (
            <input
              type="url"
              name="fbUrl"
              value={formData.fbUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://facebook.com/username"
            />
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
              {formData.fbUrl ? (
                <a href={formData.fbUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {formData.fbUrl}
                </a>
              ) : (
                'Chưa cập nhật'
              )}
            </p>
          )}
        </div>
        
        {/* Password Field */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          {isEditing ? (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mật khẩu mới"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          ) : (
            <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">••••••••</p>
          )}
        </div> */}
      </div>
      
      {/* Footer */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600">
          💡 Tip: Cập nhật thông tin cá nhân để có trải nghiệm tốt hơn
        </p>
      </div>
    </div>
  );
};

export default UserProfile;