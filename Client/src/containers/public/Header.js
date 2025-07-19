import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/banner.png'
import { Button, User } from '../../components'
import icons from '../../utils/icons'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../utils/constant'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import menuManage from '../../utils/menuManage'

const { 
    AiOutlinePlusCircle, 
    AiOutlineLogout, 
    BsChevronDown, 
    HiMenuAlt3, 
    AiOutlineClose 
} = icons

const MenuIcon = HiMenuAlt3 || (() => <span>☰</span>)
const CloseIcon = AiOutlineClose || (() => <span>✕</span>)

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
        setIsMobileMenuOpen(false)
    }, [navigate])

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])

    const gocreatePost = useCallback(() => {
        if (!isLoggedIn) {
            goLogin(false)
        } else {
            navigate('he-thong/tao-moi-bai-dang')
        }
        setIsMobileMenuOpen(false)
    }, [isLoggedIn, goLogin, navigate])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev)
        setIsShowMenu(false) 
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isMobileMenuOpen])

    return (
        <div ref={headerRef} className='w-full max-w-6xl mx-auto px-4'>
            <div className='w-full flex items-center justify-between py-3'>
               
                <Link to={'/'} className='flex-shrink-0'>
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[180px] h-[50px] sm:w-[240px] sm:h-[70px] object-contain'
                    />
                </Link>

             
                <div className='hidden md:flex items-center gap-1'>
                    {!isLoggedIn && (
                        <div className='flex items-center gap-1'>
                            <small className='hidden lg:block'>EzRoom xin chào !</small>
                            <Button
                                text={'Đăng nhập'}
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                onClick={() => goLogin(false)}
                            />
                            <Button
                                text={'Đăng ký'}
                                textColor='text-white'
                                bgColor='bg-[#3961fb]'
                                onClick={() => goLogin(true)}
                            />
                        </div>
                    )}
                    
                    {isLoggedIn && (
                        <div className='flex items-center gap-3 relative'>
                            <User />
                            <Button
                                text={'Quản lý tài khoản'}
                                textColor='text-white'
                                bgColor='bg-blue-700'
                                px='px-4'
                                IcAfter={BsChevronDown}
                                onClick={() => setIsShowMenu(prev => !prev)}
                            />
                            {isShowMenu && (
                                <div className='absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col z-50'>
                                    {menuManage.map(item => (
                                        <Link
                                            className='hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2'
                                            key={item.id}
                                            to={item?.path}
                                            onClick={() => setIsShowMenu(false)}
                                        >
                                            {item?.icon}
                                            {item.text}
                                        </Link>
                                    ))}
                                    <span
                                        className='cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2'
                                        onClick={() => {
                                            setIsShowMenu(false)
                                            dispatch(actions.logout())
                                        }}
                                    >
                                        {AiOutlineLogout && <AiOutlineLogout />}
                                        Đăng xuất
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        IcAfter={AiOutlinePlusCircle}
                        onClick={gocreatePost}
                    />
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden flex items-center gap-2'>
                    {isLoggedIn && <User />}
                    <button
                        className='mobile-menu-button p-2 text-gray-600 hover:text-gray-800 focus:outline-none'
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
                    </button>
                </div>
            </div>

          
            {isMobileMenuOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden' onClick={closeMobileMenu} />
            )}

           
            <div className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className='flex flex-col h-full'>
                    
                    <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                        <span className='text-lg font-semibold text-gray-800'>Menu</span>
                        <button
                            onClick={closeMobileMenu}
                            className='p-2 text-gray-600 hover:text-gray-800 focus:outline-none'
                        >
                            <CloseIcon size={20} />
                        </button>
                    </div>

             
                    <div className='flex flex-col flex-1 p-4 space-y-4'>
                       
                        <Button
                            text={'Đăng tin mới'}
                            textColor='text-white'
                            bgColor='bg-secondary2'
                            IcAfter={AiOutlinePlusCircle}
                            onClick={gocreatePost}
                            className='w-full justify-center'
                        />

                        {!isLoggedIn ? (
                            <div className='space-y-3'>
                                <div className='text-center text-sm text-gray-600 py-2'>
                                    EzRoom xin chào !
                                </div>
                                <Button
                                    text={'Đăng nhập'}
                                    textColor='text-white'
                                    bgColor='bg-[#3961fb]'
                                    onClick={() => goLogin(false)}
                                    className='w-full justify-center'
                                />
                                <Button
                                    text={'Đăng ký'}
                                    textColor='text-white'
                                    bgColor='bg-[#3961fb]'
                                    onClick={() => goLogin(true)}
                                    className='w-full justify-center'
                                />
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                <div className='text-sm font-medium text-gray-700 py-2 border-b border-gray-200'>
                                    Quản lý tài khoản
                                </div>
                                {menuManage.map(item => (
                                    <Link
                                        className='flex items-center gap-3 text-blue-600 hover:text-orange-500 py-2 px-2 rounded hover:bg-gray-50'
                                        key={item.id}
                                        to={item?.path}
                                        onClick={closeMobileMenu}
                                    >
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                ))}
                                <button
                                    className='flex items-center gap-3 text-blue-500 hover:text-orange-500 py-2 px-2 rounded hover:bg-gray-50 w-full text-left'
                                    onClick={() => {
                                        dispatch(actions.logout())
                                        closeMobileMenu()
                                    }}
                                >
                                    {AiOutlineLogout && <AiOutlineLogout />}
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;