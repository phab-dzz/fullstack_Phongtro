import React, { useState, useEffect } from 'react';
import { X, Edit2, Save, Calendar, DollarSign, FileText, Image, Hash, Locate, Upload, Trash2 ,LandPlot} from 'lucide-react';
import { apiUploadImages } from '../services'

const ModalPost = ({ isOpen, onClose, item, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    price: '',
    created: '',
    expired: '',
    images: [],
    description: '',
    address: '',
    area: '',
   
  });

  useEffect(() => {
    if (item) {
      const itemImages = item?.images?.image ? 
        (typeof item.images.image === 'string' ? JSON.parse(item.images.image) : item.images.image) : [];
      
      setFormData({
        code: item?.overviews?.code || '',
        title: item?.title || '',
        price: item?.attributes?.price || '',
        created: item?.overviews?.created || '',
        expired: item?.overviews?.expired || '',
        images: itemImages,
        description: item?.description || '',
        address: item?.address || '',
        area: item?.attributes?.acreage || '',
       
      });
      setImagesPreview(itemImages);
    }
  }, [item]);

  const checkStatus = (dateStr) => {
    if (!dateStr) return false;
    const expiredDate = new Date(dateStr);
    const currentDate = new Date();
    return currentDate <= expiredDate;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    
    for (let i of files) {
      let formDataUpload = new FormData();
      formDataUpload.append('file', i);
      formDataUpload.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
      
      try {
        let response = await apiUploadImages(formDataUpload);
        if (response.status === 200) {
          images = [...images, response.data?.secure_url];
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
    
    setIsLoading(false);
    console.log("Images uploaded:", images);
    setImagesPreview(prev => [...prev, ...images]);
    console.log("Images uploaded:", imagesPreview);

    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...images] 
    }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview(prev => prev?.filter(item => item !== image));
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter(item => item !== image)
    }));
  };

  const handleSave = () => {
    const updatedItem = {
      ...item,
      overviews: {
        ...item.overviews,
        code: formData.code,
        created: formData.created,
        expired: formData.expired
      },
      title: formData.title,
      attributes: {
        ...item.attributes,
        price: formData.price,
        acreage: formData.area,
      },
      images: {
        ...item.images,
        image: formData.images.filter(img => img.trim() !== '')
      },
      description: formData.description,
      address: formData.address || item.address,
      
    
    };
    
    onSave(updatedItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const itemImages = item?.images?.image ? 
      (typeof item.images.image === 'string' ? JSON.parse(item.images.image) : item.images.image) : [];
    
    setFormData({
      code: item?.overviews?.code || '',
      title: item?.title || '',
      price: item?.attributes?.price || '',
      created: item?.overviews?.created || '',
      expired: item?.overviews?.expired || '',
      images: itemImages,
      description: item?.description || '',
      address: item?.address || '',
      area: item?.attributes?.acreage || '',
      
    });
    setImagesPreview(itemImages);
    setIsEditing(false);
  };

  if (!isOpen || !item) return null;

  const status = checkStatus(item?.overviews?.expired?.split(' ')[3]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl text-center font-semibold text-gray-800">
            {isEditing ? 'Chỉnh sửa thông tin' : 'Thông tin chi tiết'}
          </h2>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit2 size={16} />
                Chỉnh sửa
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Code */}
          <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-2'>
              <Hash className="text-gray-500" size={12} />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã code
              </label>
            </div>
            <div className="w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.code}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
                  placeholder="Nhập mã code"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.code}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex items-start gap-3">
            <Image className="text-gray-500 mt-1" size={12} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hình ảnh
              </label>
              {isEditing ? (
                <div className="space-y-4">
                  {/* Upload Button */}
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFiles}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isLoading}
                    />
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                          Đang tải lên...
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                          <Upload size={24} />
                          <span className="text-sm">Nhấp để tải lên hình ảnh</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Preview */}
                  {imagesPreview.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {imagesPreview.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => handleDeleteImage(img)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {imagesPreview.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-2'>
              <FileText className="text-gray-500" size={12} />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề
              </label>
            </div>
            <div className="w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.title}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-2'>
              <FileText className="text-gray-500" size={12} />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
            </div>
            <div className="w-full">
              {isEditing ? (
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập mô tả"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.description}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-2'>
              <Locate className="text-gray-500" size={12} />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
            </div>
            <div className="w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập địa chỉ"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.address}</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-2'>
              <DollarSign className="text-gray-500" size={12} />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá
              </label>
            </div>
            <div className="w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập giá"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.price}</p>
              )}
            </div>
          </div>
          {/* area */}
           <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-2'>
              <LandPlot className="text-gray-500" size={12} />
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diện tích
              </label>
            </div>
            <div className="w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập diện tích"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.area}</p>
              )}
            </div>
          </div>
                 
           


          {/* Created Date */}
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-500" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày tạo
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.created}
                  onChange={(e) => handleInputChange('created', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập ngày tạo"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.created}</p>
              )}
            </div>
          </div>

          {/* Expired Date */}
          <div className="flex items-center gap-3">
            <Calendar className="text-gray-500" size={20} />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày hết hạn
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.expired}
                  onChange={(e) => handleInputChange('expired', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập ngày hết hạn"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">{formData.expired}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <p className={`px-3 py-2 rounded-lg font-medium ${
                status ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {status ? 'Đang hoạt động' : 'Đã hết hạn'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              <Save size={16} />
              Lưu thay đổi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalPost;