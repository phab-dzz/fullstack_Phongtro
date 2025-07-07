import React, { useCallback, useEffect, useRef } from "react";
import logo from "../../assets/logowithoutbg.png";
import { Button } from "../../components";
import icons from "../../utils/icons";
import { path } from "../../utils/constant";
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import Navigation from "./Navigation";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const { FiPlusCircle } = icons
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const HeaderRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])
    useEffect(() => {
        HeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])
    return (


        <div className="w-3/5" ref={HeaderRef} >
            <div className="max-w-1100 flex items-center justify-between ">
                <Link to={'/'} >
                    <img
                        src={logo}
                        alt="logo"
                        className='w-[240px] h-[70px] object-contain'
                    />
                </Link>
                <div className='flex items-center gap-1' >

                    {
                        !isLoggedIn && <div className="flex items-center gap-1">
                            <small>Phongtro123.com Xin chào</small>
                            <Button text={'Đăng nhập'} textColor='text-white' bgColor='bg-[#3961fb]' onClick={() => goLogin(false)} />
                            <Button text={'Đăng ký'} textColor='text-white' bgColor='bg-[#3961fb]' onClick={() => goLogin(true)} />

                        </div>
                    }
                    {
                        isLoggedIn && <div className="flex items-center gap-1">
                            <small>Chào bạn </small>
                            <Button text={'Đăng xuất'} textColor='text-white' bgColor='bg-red-700'
                                onClick={() => dispatch(actions.logout())}
                            />

                        </div>
                    }
                    <Button text={'Đăng tin mới'} textColor='text-white' bgColor='bg-red-400' IcAfter={FiPlusCircle} />

                    {/* <button className="text-white bg-[#3961fb] px-2 py-2 outline-none rounded-md hover:underline flex items-center justify-center gap-1" onClick={goLogin}>Đăng nhập </button>
                <button className="text-white bg-[#3961fb] px-2 py-2 outline-none rounded-md hover:underline flex items-center justify-center gap-1">Đăng ký</button>
                <button className="text-white bg-[red] px-2 py-2 outline-none rounded-md hover:underline flex items-center justify-center gap-1 ">Đăng tin mới <FiPlusCircle /></button> */}

                </div>

            </div>
        </div>

    )
}
export default Header;  