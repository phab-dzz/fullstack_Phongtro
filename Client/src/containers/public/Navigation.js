import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../utils/common/formatVietnameseToString";

import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";

const notActive = 'hover:bg-red-500 h-full px-4 rounded-md flex items-center'
const active = 'hover:bg-red-500 h-full px-4 rounded-md bg-red-500 flex items-center'
const Navigation = () => {
    // const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         const response = await fetch('http://localhost:3001/category/all');
    //         const data = await response.json();
    //         setCategories(data.data);
    //     }
    //     fetchCategories();
    // }, [])
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.app)
    useEffect(() => {

        // const fetchCategories = async () => {
        //     const response = await apigetcategories();
        //     setCategories(response.data.data);

        // }

        // fetchCategories();
        dispatch(actions.getCategories());

    }, [])

    return (
        <div className="w-full h-[40px]  flex justify-center items-center  bg-secondary1 text-white">
            <div className="w-3/5 flex  h-full items-center text-sm font-medium ">
                <NavLink
                    to={`/`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map((item, index) => {
                    return (
                        <div key={item.code} className="h-full flex justify-center items-center ">
                            <NavLink to={`${formatVietnameseToString(item.value)}`} className={({ isActive }) => isActive ? active : notActive} >
                                {item.value}</NavLink>

                        </div>

                    )

                })}
            </div>
        </div>
    )
}
export default Navigation;