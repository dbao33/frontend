import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from '../SignInPage/style'
import { Image } from 'antd'
import imageLogo from '../../assets/images/sign-in.png'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperTextLight } from '../TypeProductPage/style'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
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
    const showresult = () => {
        console.log('value: ', email, password, confirmPassword)
    }

    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)', height: '100vh' }}>
            <WrapperContainerLeft>
                <Image src={imageLogo} preview={false} alt='sign-in' height='auto' width='403px' math-width='540px'></Image>
            </WrapperContainerLeft>

            <div style={{ width: '500px', height: '445px', borderRadius: '6px', background: '#fff' }}>

                <WrapperContainerRight>
                    <h1 >Xin Chào</h1>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng ký tài khoản</p>

                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder='@gmail.com'
                        value={email}
                        onChange={handleOnChangeEmail}
                    />

                    {/* <InputForm placeholder='password' /> */}
                    <div style={{ fontSize: '18px', position: "relative" }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: '12px',
                                right: '4px'
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            style={{ marginBottom: "15px" }}
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnChangePassword}
                        />
                    </div>
                    {/* <InputForm style={{ marginBottom: '10px' }} placeholder='comfirm password' /> */}
                    <div style={{ fontSize: '18px', position: "relative" }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: '12px',
                                right: '4px'
                            }}
                        >
                            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            style={{ marginBottom: "15px" }}
                            placeholder="confirm password"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleOnChangeConfirmPassword}
                        />
                    </div>


                    <ButtonComponent
                        disabled={!email.length || !password.length || !confirmPassword.length}
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
                        textButton={'Đăng ký'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    >
                    </ButtonComponent>

                    <p style={{ fontSize: '16px' }}>
                        Bạn đã có tài khoản?<WrapperTextLight onClick={handleNavigateLogin} > Đăng nhập</WrapperTextLight></p>

                </WrapperContainerRight>
            </div>
        </div>

    )

}

export default SignInPage