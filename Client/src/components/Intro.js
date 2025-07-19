import React from "react";
import { text } from '../utils/dataIntro';
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from '../components';
import { formatVietnameseToString } from "../utils/common/formatVietnameseToString";
import { useNavigate } from "react-router-dom";

const { GrStar } = icons;

const star = [1, 2, 3, 4, 5];

const Intro = () => {
    const { categories } = useSelector((state) => state.app);
    const {isLoggedIn} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const handlepost = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/he-thong/tao-moi-bai-dang');
        }
    };
    
    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-md shadow-md p-4 sm:p-6 lg:p-8 gap-4 flex flex-col justify-center items-center">
        
            <h1 className="font-semibold text-lg sm:text-xl lg:text-2xl text-center">
                {text.title}
            </h1>
            
         
            <p className="text-gray-800 text-center my-4 text-sm sm:text-base px-2">
                {text.description}
            </p>
            
       
            <div className="text-center px-2">
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <Link
                            to={`/${formatVietnameseToString(item.value)}`}
                            key={item.code}
                            className="text-blue-600 font-medium hover:text-orange-600 text-sm sm:text-base inline-block mr-1"
                        >
                            {`${item.value.toLowerCase()}, `}
                        </Link>
                    )
                })}
            </div>
            
           
            <div className="flex flex-wrap items-center justify-center sm:justify-around w-full gap-4 sm:gap-2 my-4">
                {text.statistic.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col justify-center items-center min-w-[80px]">
                            <h4 className="font-semibold text-lg sm:text-xl">{item.value}</h4>
                            <p className="text-gray-700 text-xs sm:text-sm text-center">{item.name}</p>
                        </div>
                    )
                })}
            </div>
            
            
            <h3 className="font-bold text-lg sm:text-xl py-2 text-center">
                {text.price}
            </h3>
            
        
            <div className="flex items-center justify-center gap-1">
                {star.map(item => {
                    return (
                        <span key={item}>
                            <GrStar size={window.innerWidth < 640 ? 20 : 24} color='yellow' />
                        </span>
                    )
                })}
            </div>
            
          
            <p className="text-gray-600 italic text-center text-sm sm:text-base px-2 max-w-2xl">
                {text.comment}
            </p>
        
            <span className="text-gray-700 text-sm sm:text-base">{text.author}</span>
            
      
            <h3 className='font-bold text-lg sm:text-xl py-2 text-center px-2'>
                {text.question}
            </h3>
            
           
            <p className="text-sm sm:text-base text-center px-2 max-w-3xl">
                {text.answer}
            </p>
          
            <div className="w-full flex justify-center mt-4">
                <Button
                    text='Đăng tin ngay'
                    bgColor='bg-secondary2'
                    textColor='text-white'
                    px='px-4 sm:px-6'
                    className="w-full sm:w-auto text-sm sm:text-base"
                    onClick={handlepost}
                />
            </div>
            
            <div className='h-8 sm:h-12'></div>
        </div>
    )
}

export default Intro;