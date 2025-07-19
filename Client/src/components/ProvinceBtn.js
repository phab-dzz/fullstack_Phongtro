import React, { memo } from "react";
import { useSelector,useDispatch } from "react-redux";
import * as actions from '../store/actions';

const ProvinceBtn = ({ name, image }) => {
    const dispatch = useDispatch();
    const handleNavigate = () => {
        if (!name) return;
        if( name.includes('Hồ Chí Minh')) {
        dispatch(actions.getPostsLimit({ provinceCode: 'CUID'}));
        }
        if( name.includes('Hà Nội')) {
        dispatch(actions.getPostsLimit({ provinceCode: 'NDOE' }));
        }
        if( name.includes('Đà Nẵng')) {
        dispatch(actions.getPostsLimit({ provinceCode: 'NNAE' }));
        }

    }
    return (
        <div className="shadow-md rounded-bl-md rounded-br-md cursor-pointer bg-white  text-blue-600 hover:text-red-500 " onClick={handleNavigate} >
            <img src={image}
                alt={name}
                className="w-[180px] h-[110px] object-cover rounded-tl-md rounded-tr-md" />
            <div className=" font-medium p-2  text-center ">{name}</div>
        </div>
    )
}
export default memo(ProvinceBtn);
