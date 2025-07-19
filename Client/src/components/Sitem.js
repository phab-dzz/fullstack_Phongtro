import React,{memo} from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useNavigate } from 'react-router-dom';
 const Sitem = ({title, price , image, createdAt,code}) => {
    const navigate = useNavigate();
    const formatTime = (createdAt) => {
        return moment(createdAt).locale('vi').fromNow();
    };
    //  const handleClick = () => {
        const handlenavigate = () => {
            navigate(`/chi-tiet/${title}/${code}`);
        }



    return (
        <div className="w-full  flex  items-center gap-2 py-2 border-b border-gray-300" onClick={handlenavigate}>
           <img src={image[0]} alt="anh"
           className='w-[65px] h-[65px] object-cover rounded-md ' />
           <div className='flex flex-col justify-between w-full flex-auto gap-1'>
            <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0,45)}...`}</h4>
            <div className='flex items-center justify-between w-full'>
                <span className='text-sm font-medium text-green-500'> {price}</span>
                <span className='text-sm text-gray-300'>{formatTime(createdAt)}</span>
            </div>
           </div>
           {/* <div className='flex items-center'>
               <button onClick={handlenavigate} className='text-blue-500'>Xem chi tiết</button>
           </div> */}
        </div>
    );
};
export default memo(Sitem);