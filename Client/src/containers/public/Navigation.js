import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../utils/common/formatVietnameseToString";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const notActive = 'hover:bg-red-500 px-4 py-2 rounded-md flex items-center';
const active = 'hover:bg-red-500 px-4 py-2 rounded-md bg-red-500 flex items-center';

const Navigation = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);

  return (
    <div className="w-full bg-secondary1 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center text-sm font-medium">
        <NavLink
          to={`/`}
          className={({ isActive }) => isActive ? active : notActive}
        >
          Trang chủ
        </NavLink>

        {categories?.length > 0 && categories.map((item) => (
          <NavLink
            key={item.code}
            to={`/${formatVietnameseToString(item.value)}`}
            className={({ isActive }) => isActive ? active : notActive}
          >
            {item.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
