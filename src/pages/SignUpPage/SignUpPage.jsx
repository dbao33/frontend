import React, { useEffect, useState } from 'react'
import { WrapperContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import useMutationHooks from '../../hooks/UseMutationHook'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import * as Message from '../../components/Message/Message'
import './style.css'

const SignInPage = () => {
    const navige = useNavigate()
    const handleNavigateLogin = () => {
        navige('/sign-in')
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const mutation = useMutationHooks(data => UserService.UserSignUp(data))
    const { data, isLoading } = mutation
    useEffect(() => {
        if (data?.status === 'OK') {
            Message.success()
            handleNavigateLogin()
        } else if (data?.status === 'ERR') {
            Message.error(data?.message)
        }
    }, [data?.status])

    const showresult = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
        })
        // console.log('value: ', email, password, confirmPassword)
    }

    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '', height: '100vh' }}>
            {/* <WrapperContainerLeft>
                <Image src={imageLogo} preview={false} alt='sign-in' height='auto' width='403px' math-width='540px'></Image>
            </WrapperContainerLeft> */}

            < div style={{
                width: '400px',
                height: '470px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.3)',
            }}>

                <WrapperContainer>
                    <h1 >Xin Chào</h1>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng ký tài khoản</p>

                    <InputForm
                        style={{ marginBottom: '10px', padding: '8px', background: 'rgba(255, 255, 255, 0.5)' }}
                        placeholder='@gmail.com'
                        value={email}
                        onChange={handleOnChangeEmail}
                    />

                    {/* <InputForm placeholder='password' /> */}
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
                        <InputForm
                            style={{ marginBottom: '15px', padding: '8px', background: 'rgba(255, 255, 255, 0.5)' }}
                            placeholder='password'
                            type={isShowPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>
                    {/* <InputForm style={{ marginBottom: '10px' }} placeholder='comfirm password' /> */}
                    <div style={{ fontSize: '18px', position: 'relative' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '9px',
                                right: '11px'
                            }}
                        >
                            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            style={{ marginBottom: '15px', padding: '8px', background: 'rgba(255, 255, 255, 0.5)' }}
                            placeholder='confirm password'
                            type={isShowConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPassword}
                        />
                    </div>
                    {data?.status === 'ERR' && (
                        <span style={{ color: 'red' }}>{data?.message}</span>
                    )}

                    <LoadingComponent isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length || !confirmPassword.length}
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
                            textButton={'Đăng ký'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        >
                        </ButtonComponent>
                    </LoadingComponent>
                    <p style={{ fontSize: '16px' }}>
                        Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateLogin} > Đăng nhập</WrapperTextLight></p>

                </WrapperContainer>
            </div>
        </div>

    )

}

export default SignInPage