import React, { useState, useEffect } from "react";
import { InputForm, Button } from "../../components";

import { useLocation } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setpayload] = useState({
        phone: '',
        password: '',
        name: '',


    })
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])
    useEffect(() => {
        isLoggedIn && navigate('/')

    }, [isLoggedIn])
    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])
    const handleSubmit = async () => {
        // console.log(payload)
        // isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))

        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        console.log("finalPayload", finalPayload)
        let invalids = validate(finalPayload)
        console.log("invalid" + invalids)
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
        console.log(invalids)
    }
    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload);
        // console.log(fields)
        console.log(fields)
        fields.forEach(item => {
            if (item[1] === '') {

                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    message: "Bạn không được bỏ trống trường này"
                }])
                invalids++;
            }
        })
        fields.forEach(item => {
            switch (item[0]) {
                case 'password':
                    if (item[1].length < 6) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: "Mật khẩu phải lớn hơn 6 kí tự"
                        }])
                        invalids++;
                    }
                    break;
                case 'phone':
                    if (!+item[1]) {
                        setInvalidFields(prev => [...prev, {
                            name: item[0],
                            message: 'Số điện thoại không hợp lệ.'
                        }])
                        invalids++
                    }
                    break
                default:
                    break;

            }
        })

        return invalids;
    }
    // const handleSubmit = async () => {
    //     let finalPayload = isRegister ? payload : {
    //         phone: payload.phone,
    //         password: payload.password
    //     }
    //     let invalids = validate(finalPayload)
    //     if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    // }
    return (
        <div className="bg-white w-[600px] p-[30px] pd-[100px] rounded-md shadow-sm">
            <h3 className="font-semibold text-2xl mb-3">{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
            <div className="w-full flex flex-col gap-3">
                {isRegister &&
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} label={'HỌ TÊN'}
                        value={payload.name}
                        setvalue={setpayload}
                        keyPayLoad={'name'}
                    />}
                <InputForm label={'SỐ ĐIỆN THOẠI'}
                    value={payload.phone}
                    setvalue={setpayload} keyPayLoad={'phone'}
                    setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields} />
                <InputForm label={'MẬT KHẨU'}
                    value={payload.password} setvalue={setpayload}
                    keyPayLoad={'password'} setInvalidFields={setInvalidFields}
                    invalidFields={invalidFields}
                    type='password' />
            </div>
            <span className="mr-5">
            </span>
            <Button

                text={isRegister ? 'Đăng kí' : 'Đăng nhập'}
                bgColor={'bg-[#3961fb]'}
                textColor={'text-white'}
                fullWidth={true}
                onClick={handleSubmit}
            />
            <div className="mt-7 flex items-center justify-between">
                {isRegister ? <small>Bạn đã có tài khoản ?
                    <span onClick={() => {
                        setIsRegister(false);
                        setpayload({ phone: '', password: '', name: '' });
                    }}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >Đăng nhập ngay</span></small> :
                    <>
                        <small className="text-blue-600 hover:text-[red] cursor-pointer">
                            Bạn quên mật khẩu
                        </small>
                        <small onClick={() => {
                            setIsRegister(true)
                            setpayload({ phone: '', password: '', name: '' });
                        }} className="text-blue-600 hover:text-[red] cursor-pointer">
                            Tạo tài khoản mới
                        </small>
                    </>
                }

            </div>


        </div>
    )
}
export default Login;