import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useSearchParam,useLocation } from 'react-router-dom';
import { getPostById } from "../../store/actions/post";
import ImageSlider from '../../components/ImageSlider';
import * as actions from '../../store/actions'
import { Province, ItemSidebar,RelatedPost,MapView ,MapWithSearch} from "../../components";
import formatDate from '../../utils/formatDate';


import logo from '../../assets/logowithoutbg.png'
const DetailsPost = () => {
      const location = useLocation();
  const pathParts = location.pathname.split("/");
  
 const lat = 10.7769; // Vĩ độ
  const lng = 106.7009; // Kinh độ
  const uuid = pathParts[pathParts.length - 1];
    const dispatch = useDispatch();
    const { postById } = useSelector(state => state.post);
    // const [detail, setDetail] = React.useState("Chưa có thông tin mô tả");
  
    useEffect(() => {
       
        if (uuid) {
            dispatch(getPostById(uuid));
            // setDetail(postById.JSON.parse(postById?.description))
        }
        
    }, [uuid, dispatch]);
    console.log("postById", postById);
//  function removeHouseNumberAdvanced(address) {
//     console.log("address", address);
//   return address.replace(/^((Số|No\.?)\s*)?\d+[A-Za-z\-]*\s*/i, '').trim();
// }
const removeHouseNumberAdvanced = (address) => {
    if (!address) return '';
    // Loại bỏ số nhà và ký tự đặc biệt
   if (!address || typeof address !== 'string') return '';
  return address.replace(/^\s*(Số\s*)?[\d\/\-A-Za-z]+\s+/, '').trim();
  };




    const arrImages= postById?.images?.image.length > 0 ? JSON.parse(postById.images?.image) : [];
    console.log("arrImages", arrImages);
   

    console.log("postById", postById);
    return (
        <div className='w-full flex flex-col gap-3'>
            <div>
                <h4 className='text-[18px] font-medium'>{postById.title}</h4>

            </div>

           <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <div className='w-full flex items-center'>
                <ImageSlider arrImages={arrImages} />

                </div>
                <div className='w-full flex flex-col gap-2 mt-4 bg-white-300 shadow-lg rounded-sm'>
                    <h2 className='text-[30px] font-medium text-red-600'>{postById.title}</h2>
                    <div className='flex items-center gap-2'>
                        <span className=' text-green-500 text-[18px]'>{postById?.attributes?.price}</span>
                        <span className='pl-[60px] text-[14px] font-normal'>{postById?.attributes?.acreage}</span>
                        <span className='pl-[300px] text-[14px] font-normal'>{postById?.attributes?.published}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-[14px] font-medium'>Địa chỉ:</span>
                        <span className=' pl-[60px] text-[14px] font-normal'>{postById?.address?.split(':')[1].trim()}</span>
                    </div>
                     <div className='flex items-center gap-2'>
                        <span className='text-[14px] font-medium'>Mã tin:</span>
                        <span className=' pl-[60px] text-[14px] font-normal'>{` #${postById?.attributes?.hashtag}`}</span>
                    </div>
                     <div className='flex items-center gap-2'>
                        <span className='text-[14px] font-medium'>Ngày đăng :</span>
                        <span className=' pl-[60px] text-[14px] font-normal'>{formatDate(postById?.createdAt)}</span>
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <span className='text-[14px] font-medium'>Thông tin chi tiết :</span>
                        <span className=' text-[14px] font-normal'>{postById?.description?.replace('Thông tin mô tả:', '').replace(/[-]{2,}/g, '').replace(/["']/g, '') .replace(/["'\[\]]/g, '').trim()}</span>
                        </div>
                                            <MapWithSearch address={removeHouseNumberAdvanced(postById?.address?.split(':')[1].trim())} />
                </div>

            </div>
            <div className='w-[30%] border flex flex-col gap-4 justify-start items-center '>
                <div className='w-full flex flex-col gap-2 bg-white-300 shadow-lg rounded-sm p-4 justify-center items-center' >
                    <span className='text-[20px] text-red-400 font-medium'>{"Thông tin liên hệ"}</span>
                    <img className='w-[100px] h-[100px] rounded-full object-cover' src={postById?.user?.avatar|| logo} alt='avatar' />

                    <span className='text-[16px] font-medium'>{postById?.user?.name}</span>
                    <button className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 w-[200px] flex items-center justify-center gap-2'>
                        <i className="bi bi-telephone-fill me-2"></i>
       { postById?.user?.phone || 'Chưa cập nhật số điện thoại' }
                    </button>
                    <button className='py-2 px-4 bg-green-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 w-[200px] flex items-center justify-center gap-2'>
                        <i className="icon chat-text white me-2"></i>
       { 'nhắn zalo' }
                    </button>



                  
                </div>
                <div className='w-full flex flex-col gap-2'>

                <RelatedPost />
                <MapView latitude={lat} longitude={lng} />

           </div>
           </div>
           
        </div>
        </div>
    );
};

export default DetailsPost;