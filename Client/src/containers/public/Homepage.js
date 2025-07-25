import React, { useEffect } from "react";

import { text } from "../../utils/constant";
import { Province, ItemSidebar,RelatedPost } from "../../components";
import { Pagination } from '../public/index'
import { List } from './index'
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import ImageSlider from "../../components/ImageSlider";
const Homepage = () => {
    const [params] = useSearchParams()
    const { categories, prices, areas } = useSelector(state => state.app)
   
    


    return (
        <div className="w-full flex flex-col gap-3 m-2">

            <div>

                <h1 className="text-[25px] font-bold ">
                    {text.HOME_TITLE}
                </h1>
                <p className="text-[13px] text-gray-600">
                    {text.HOME_DESCRIPTION}
                </p>
            </div >
            <Province />
            <div className="w-full flex gap-4">
                <div className="w-full md:w-[70%] ">
                    <List page1={params.get('page')} />
                    <Pagination length={40} Number={params.get('page')} />
                    {/* <div className=" h-[500px]" >
l
                    </div> */}
                </div>
                <div className="w-[30%] hidden md:block border flex flex-col gap-4 justify-start items-center ">
                    <ItemSidebar content={categories} title='Danh sach cho thue' />
                    <ItemSidebar isDouble={true} type='priceCode' content={prices} title='Xem theo giá' />
                    <ItemSidebar isDouble={true} type='areaCode' content={areas} title='Xem theo Diện tích' />
                    <RelatedPost />
                </div>
            </div>



        </div>
    );
}
export default Homepage;