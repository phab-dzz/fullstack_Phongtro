import React from 'react';
import anonAvatar from '../../assets/anon-avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import menuSidebar from '../../utils/menuSidebar';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions';
import { AiOutlineLogout } from 'react-icons/ai';
import clsx from 'clsx';

const activeStyle = 'flex items-center gap-1 text-black font-bold bg-gray-100 p-2 rounded-md';
const notActiveStyle = 'flex items-center gap-1 hover:text-blue-600';

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentData } = useSelector(state => state.user);

  return (
    <>
    
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
        />
      )}

    
      <div
        className={clsx(
          'bg-gray-200 w-[256px] p-4 flex flex-col gap-6 h-full z-50',
          'fixed top-0 left-0 transition-transform duration-300 ease-in-out',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen,
            'md:translate-x-0 md:static md:block': true,
          }
        )}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <img
              src={currentData?.avatar || anonAvatar}
              alt="avatar"
              className='w-12 h-12 object-cover rounded-full border-2 border-white'
            />
            <div className='flex flex-col justify-center'>
              <span className='font-semibold'>{currentData?.name}</span>
              <small>{currentData?.phone}</small>
            </div>
          </div>
          <span>
            Mã thành viên:{' '}
            <small className='font-medium'>
              {currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}
            </small>
          </span>
        </div>

        <div className='flex flex-col gap-2'>
          {menuSidebar.map(item => (
            <NavLink
              key={item.id}
              to={item?.path}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
              onClick={onClose}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          ))}

          <span
            onClick={() => {
              dispatch(actions.logout());
              onClose?.();
            }}
            className={notActiveStyle + ' cursor-pointer'}
          >
            <AiOutlineLogout />
            Thoát
          </span>
        </div>
      </div>

   
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t z-50 flex justify-around py-2">
        {menuSidebar.map(item => (
          <NavLink
            key={item.id}
            to={item?.path}
            className={({ isActive }) =>
              isActive ? 'text-blue-600 flex flex-col items-center text-sm' : 'text-gray-600 flex flex-col items-center text-sm'
            }
            onClick={onClose}
          >
            {item.icon}
           <span>{item.text.split(' ').slice(0, 2).join(' ')}</span>

          </NavLink>
        ))}

        <span
          onClick={() => {
            dispatch(actions.logout());
            onClose?.();
          }}
          className="text-gray-600 flex flex-col items-center text-sm cursor-pointer"
        >
          <AiOutlineLogout />
          <span>Thoát</span>
        </span>
      </div>
    </>
  );
};

export default Sidebar;
