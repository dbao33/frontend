import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import { Image } from 'antd'
import imageLogo from '../../assets/images/sign-in.png'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperTextLight } from '../TypeProductPage/style'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import useMutationHooks from '../../hooks/UseMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
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


    const mutation = useMutationHooks(data => UserService.UserLogin(data))
    // console.log('mutation', mutation)
    const { data, isLoading } = mutation
    const showresult = () => {
        mutation.mutate({
            email,
            password,
        })
    }



    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)', height: '100vh' }}>
            <WrapperContainerLeft>
                <Image src={imageLogo} preview={false} alt='sign-in' height='auto' width='403px' math-width='540px'></Image>
            </WrapperContainerLeft>

            <div style={{ width: '500px', height: '445px', borderRadius: '6px', background: '#fff' }}>

                <WrapperContainerRight>
                    <h1 >Xin Chào</h1>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng nhập tài khoản</p>
                    <InputForm
                        style={{ marginBottom: '10px' }}
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
                                top: '12px',
                                right: '4px'
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm style={{ marginBottom: '15px' }}
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
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
                                background: 'rgb(5, 5, 7)',
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
                    
                    <p style={{ fontSize: '16px' }}>
                        <WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>

                    <p style={{ fontSize: '16px' }} >
                        Chưa có tài khoản?<WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản</WrapperTextLight></p>

                </WrapperContainerRight>
            </div>
        </div>

    )

}

export default SignInPage