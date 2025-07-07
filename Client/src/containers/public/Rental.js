import React, { useEffect } from "react";
import { text } from "../../utils/constant";
import { Province, ItemSidebar, RelatedPost } from "../../components";
import { Pagination ,List} from './index';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import  * as actions from '../../store/actions';
import { formatVietnameseToString } from "../../utils/common/formatVietnameseToString";
import { TbCategory } from "react-icons/tb";
const Rental = () => {
    const {prices, areas, categories} = useSelector(state => state.app);
    const [categoryCode, setCategoryCode] = React.useState({});
    const [categoryCurrent, setCategoryCurrent] = React.useState('none');
    const location = useLocation();
    const dispatch = useDispatch();
useEffect(() => {
    const category=categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname);
    setCategoryCurrent(category)
    if (category) {
        setCategoryCode(category.code);
    }
}, [location]);

    return (
        <div className="border  w-full flex flex-col gap-3 m-2">

            <div>

                <h1 className="text-[28px] font-bold ">
                    {categoryCurrent?.header || text.HOME_TITLE}
                </h1>
                <p className="text-sm text-gray-600">
                    {categoryCurrent?.subheader || text.HOME_SUBTITLE}
                </p>
            </div >

            <Province />
            <div className="w-full flex gap-4">
                <div className="w-[70%]">
                    <List  categoryCode={categoryCode} />
                    <Pagination  />
                   
                </div>
                <div className="w-[30%] border flex flex-col gap-4 justify-start items-center ">
                    <ItemSidebar content={categories} title='Danh sach cho thue' />
                    <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo Diện tích' />
                    <RelatedPost /> 
                </div>
            </div>



        </div>
    );
}
export default Rental;