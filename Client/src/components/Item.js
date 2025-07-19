import React, { memo, useState } from 'react'
import icons from '../utils/icons'
import { useNavigate, Link } from 'react-router-dom'
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'
import anonAvatar from '../assets/anon-avatar.png'
const images = [
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/03/507ce676-0681-4fe6-bac3-55a7eef70fc3_1656803285.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/03/f6480ee4-11fc-453b-882b-25f03a2bd77e_1656803279.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/03/1b8acfac-f2ef-40c1-962a-d3343d29aca6_1656803278.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/03/1af022b3-1701-4eae-9135-0c56a334a015_1656803279.jpg",

]
const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons
const indexs = [0, 1, 2, 3]

const Item = ({ images, user, title, star, description, attributes, address, id }) => {
    
    console.log("images", images)
    const [isHoverHeart, setIsHoverHeart] = useState(false)
    const navigate = useNavigate()
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        return stars

    }
    
    return (
        <div className='w-full flex flex-col md:flex-row border-t border-orange-600 py-4'>
  <Link
    to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
    className='w-full md:w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'
  >
    {(() => {
      const imagesToShow = images.filter((_, index) => indexs.includes(index));
      const imgCount = imagesToShow.length;

      return imagesToShow.map((img, index) => {
        let widthClass = 'w-full';
        let heightClass = 'h-full';

        if (imgCount === 2) {
          widthClass = 'w-[calc(50%-1px)]';
          heightClass = 'h-[200px]';
        } else if (imgCount >= 3) {
          widthClass = 'w-[47%]';
          heightClass = 'h-[120px]';
        }

        return (
          <img
            key={index}
            src={img}
            alt="preview"
            className={`${widthClass} ${heightClass} object-cover rounded`}
          />
        );
      });
    })()}
    <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>
      {`${images.length} ảnh`}
    </span>
    <span
      className='text-white absolute right-5 bottom-1'
      onMouseEnter={() => setIsHoverHeart(true)}
      onMouseLeave={() => setIsHoverHeart(false)}
    >
      {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
    </span>
  </Link>

  <div className='w-full md:w-3/5 mt-2 md:mt-0 md:ml-1'>
    <div className='flex justify-between gap-4 w-full'>
      <div className='text-red-600 font-medium text-sm md:text-base'>
        {handleStar(+star).length > 0 &&
          handleStar(+star).map((star, number) => (
            <span key={number}>{star}</span>
          ))}
        {title}
      </div>
      <div className='hidden md:flex w-[10%] justify-end'>
        <BsBookmarkStarFill size={24} color='orange' />
      </div>
    </div>

    <div className='my-2 flex flex-wrap items-center justify-between gap-2 text-sm'>
      <span className='font-bold text-green-600 whitespace-nowrap truncate'>
        {attributes?.price}
      </span>
      <span className='truncate'>{attributes?.acreage}</span>
      <span className='truncate'>
        {`${address?.split(',').slice(-2).join(', ')}`}
      </span>
    </div>

    <p className='text-gray-500 w-full h-[120px] overflow-hidden text-ellipsis text-sm '>
      {description}
    </p>

    <div className='flex flex-col sm:flex-row items-start sm:items-end justify-between gap-1'>
      <div className='flex items-center gap-2'>
        <img
          src={user.avatar || anonAvatar}
          alt="avatar"
          className='w-[30px] h-[30px] object-cover rounded-full'
        />
        <p className='text-sm'>{user?.name}</p>
      </div>
      <div className='flex items-center gap-2 overflow-auto hide-scrollbar'>
        <button
          type='button'
          className='bg-blue-700 text-white px-3 py-1 rounded-md text-xs whitespace-nowrap'
        >
          {`Gọi ${user?.phone}`}
        </button>
        <button
          type='button'
          className='text-blue-700 border border-blue-700 px-2 py-1 rounded-md text-xs whitespace-nowrap'
        >
          Nhắn zalo
        </button>
      </div>
    </div>
  </div>
</div>

    )
}

export default memo(Item)