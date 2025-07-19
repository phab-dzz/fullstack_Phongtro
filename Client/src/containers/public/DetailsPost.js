import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useSearchParam,useLocation } from 'react-router-dom';
import { getPostById } from "../../store/actions/post";
import ImageSlider from '../../components/ImageSlider';
import * as actions from '../../store/actions'
import { Province, ItemSidebar,RelatedPost,MapView ,MapWithSearch} from "../../components";
import { MapPin, Phone, MessageCircle, Calendar, Hash, Home, DollarSign, Ruler, Eye, Share2, Heart, Info } from 'lucide-react';

import formatDate from '../../utils/formatDate';

import logo from '../../assets/anon-avatar.png';

const DetailsPost = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/");
    
    const lat = 10.7769; // Vĩ độ
    const lng = 106.7009; // Kinh độ
    const uuid = pathParts[pathParts.length - 1];
    const dispatch = useDispatch();
    const { postById } = useSelector(state => state.post);
    
    useEffect(() => {
        if (uuid) {
            dispatch(getPostById(uuid));
        }
    }, [uuid, dispatch]);

    const removeHouseNumberAdvanced = (address) => {
        if (!address) return '';
        if (!address || typeof address !== 'string') return '';
        return address.replace(/^\s*(Số\s*)?[\d\/\-A-Za-z]+\s+/, '').trim();
    };

    const arrImages = postById?.images?.image.length > 0 ? JSON.parse(postById.images?.image) : [];

    const ActionButton = ({ icon: Icon, label, onClick, className = "" }) => (
        <button 
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-sm sm:text-base ${className}`}
        >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="truncate">{label}</span>
        </button>
    );

    const InfoCard = ({ icon: Icon, label, value, className = "" }) => (
        <div className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${className}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{label}:</span>
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-900 break-words">{value}</span>
            </div>
        </div>
    );

    return (
        <div className='w-full max-w-8xl mx-auto px-2 sm:px-4 py-3 sm:py-6'>
            {/* Header */}
            <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                    <h1 className='text-2xl sm:text-4xl font-bold text-red-900 line-clamp-3 sm:line-clamp-2 pr-2'>
                        {postById.title}
                    </h1>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <ActionButton 
                            icon={Share2} 
                            label="Chia sẻ" 
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1 sm:flex-none" 
                        />
                        <ActionButton 
                            icon={Heart} 
                            label="Yêu thích" 
                            className="bg-red-50 text-red-600 hover:bg-red-100 flex-1 sm:flex-none" 
                        />
                    </div>
                </div>
                
                {/* Quick Info Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Mã tin: #{postById?.attributes?.hashtag}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{formatDate(postById?.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="line-clamp-1">{postById?.address?.split(':')[1]?.trim()}</span>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-6'>
                {/* Main Content */}
                <div className='w-full lg:w-[70%] order-1'>
                    {/* Image Slider */}
                    <div className='w-full mb-4 sm:mb-6'>
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                            <ImageSlider arrImages={arrImages} />
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 mb-4 sm:mb-6'>
                        <h2 className='text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 line-clamp-2'>
                            {postById.title}
                        </h2>
                        
                        {/* Price and Key Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-green-700 font-medium">Giá thuê</p>
                                        <p className="text-lg sm:text-xl font-bold text-green-800 truncate">
                                            {postById?.attributes?.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Ruler className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-blue-700 font-medium">Diện tích</p>
                                        <p className="text-lg sm:text-xl font-bold text-blue-800 truncate">
                                            {postById?.attributes?.acreage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl sm:col-span-2 lg:col-span-1">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-purple-700 font-medium">Ngày đăng</p>
                                        <p className="text-base sm:text-lg font-bold text-purple-800 truncate">
                                            {postById?.attributes?.published}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Property Information */}
                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            <InfoCard 
                                icon={Home} 
                                label="Địa chỉ" 
                                value={postById?.address?.split(':')[1]?.trim()} 
                            />
                            <InfoCard 
                                icon={Hash} 
                                label="Mã tin" 
                                value={`#${postById?.attributes?.hashtag}`} 
                            />
                            <InfoCard 
                                icon={Calendar} 
                                label="Ngày đăng" 
                                value={formatDate(postById?.createdAt)} 
                            />
                        </div>

                        {/* Description */}
                        <div className="border-t pt-4 sm:pt-6">
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Thông tin chi tiết</h3>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {postById?.description?.replace('Thông tin mô tả:', '').replace(/[-]{2,}/g, '').replace(/["']/g, '').replace(/["'\[\]]/g, '').trim()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6'>
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Vị trí</h3>
                        </div>
                        
                        {/* Contact Info on Map */}
                        <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-blue-50 rounded-xl">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <img 
                                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-blue-200 flex-shrink-0' 
                                    src={postById?.user?.avatar || logo} 
                                    alt='avatar' 
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                                        {postById?.user?.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                                        {postById?.user?.phone || 'Chưa cập nhật số điện thoại'}
                                    </p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                    <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="rounded-xl overflow-hidden">
                            <MapWithSearch address={removeHouseNumberAdvanced(postById?.address?.split(':')[1]?.trim())} />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className='w-full lg:w-[30%] order-2 lg:order-2 space-y-4 lg:space-y-6'>
                    {/* Contact Card */}
                    <div className='bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6'>
                        <div className="text-center mb-4 sm:mb-6">
                            <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4'>
                                Thông tin liên hệ
                            </h3>
                            <div className="relative inline-block">
                                <img 
                                    className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-blue-100' 
                                    src={postById?.user?.avatar || logo} 
                                    alt='avatar' 
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <h4 className='text-base sm:text-lg font-semibold text-gray-900 mt-2 sm:mt-3 truncate'>
                                {postById?.user?.name}
                            </h4>
                            <p className='text-xs sm:text-sm text-gray-600'>Chủ nhà</p>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <ActionButton 
                                icon={Phone} 
                                label={postById?.user?.phone || 'Chưa cập nhật'}
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            />
                            <ActionButton 
                                icon={MessageCircle} 
                                label="Nhắn tin Zalo"
                                className="w-full bg-green-600 text-white hover:bg-green-700"
                            />
                        </div>

                        {/* Quick Contact Info */}
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
                            <div className="text-center text-xs sm:text-sm text-gray-600">
                                <p>Liên hệ ngay để được tư vấn</p>
                                <p className="font-medium text-blue-600">miễn phí và nhanh chóng</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <RelatedPost />
                </div>
            </div>
        </div>
    );
};

export default DetailsPost;