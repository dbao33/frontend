import React, { useEffect, useState } from 'react'
import { WrapperContainer, WrapperTextLight } from './style'

import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import useMutationHooks from '../../hooks/UseMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import jwt_decode from 'jwt-decode'
import { updateUser } from '../../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import * as Message from '../../components/Message/Message'
import './style.css'
const SignInPage = () => {
    const navige = useNavigate()
    const handleNavigateSignUp = () => {
        navige('/sign-up')
    }
    const [isShowPassword, setIsShowPassword] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const location = useLocation()

    const mutation = useMutationHooks(data => UserService.UserLogin(data))
    // console.log('mutation', mutation)
    const { data, isLoading } = mutation

    const dispatch = useDispatch()
    const handleGetDetailsUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.stringify(storage)
        // lay duoc du lieu tu backend
        const response = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...response?.data, access_token: token, refreshToken }))
    }

    useEffect(() => {
        if (data?.status === 'OK') {

            navige('/')
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if (data?.access_token) {
                const decoded = jwt_decode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }

        } else if (data?.status === 'ERR') {
            Message.error(data?.message)
        }
    }, [data?.status])

    const showresult = () => {
        mutation.mutate({
            email,
            password,
        })
    }



    return (

        <div id='sign' style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>


            < div style={{
                width: '400px',
                height: '445px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.3)',
            }}>
                <WrapperContainer>

                    <h1 >Xin Chào</h1>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng nhập tài khoản</p>
                    <InputForm
                        style={{ marginBottom: '10px', padding: '8px', background: 'rgba(255, 255, 255, 0.5)' }}
                        placeholder='@gmail.com'
                        value={email}
                        onChange={handleOnChangeEmail}
                    />

                    <div style={{ fontSize: '18px', position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '9px',
                                right: '11px'
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm style={{ marginBottom: '15px', padding: '8px', background: 'rgba(255, 255, 255, 0.5)' }}
                            placeholder='password'
                            type={isShowPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>
                    {data?.status === 'ERR' && (
                        <span style={{ color: 'red' }}>{data?.message}</span>
                    )}
                    <LoadingComponent isLoading={isLoading}>

                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={showresult}
                            size={40}
                            styleButton={{
                                background: 'linear-gradient(183deg, rgba(91,35,201,1) 17%, rgba(206,54,136,1) 50%, rgba(45,45,137,1) 87%)',
                                height: '48px',
                                width: '100%',
                                borderRadius: '4px',
                                border: 'none',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Đăng nhập'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >
                        </ButtonComponent>
                    </LoadingComponent>
                    {/* style={{ background: 'rgba(255, 255, 255, 0.5)' }} */}
                    <p style={{ fontSize: '16px' }}>
                        <WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>

                    <p style={{ fontSize: '16px' }} >
                        Chưa có tài khoản?<WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>

                </WrapperContainer>
            </div>
        </div >
    )

}

export default SignInPage