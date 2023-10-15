import React, { useState } from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from '../SignInPage/style'
import { Image } from 'antd'
import imageLogo from '../../assets/images/sign-in.png'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperTextLight } from '../TypeProductPage/style'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isConfirmPassword, setIsConfirmPassword] = useState(false)
    return (

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)', height: '100vh' }}>
            <WrapperContainerLeft>
                <Image src={imageLogo} preview={false} alt='sign-in' height='auto' width='403px' math-width='540px'></Image>
            </WrapperContainerLeft>

            <div style={{ width: '500px', height: '445px', borderRadius: '6px', background: '#fff' }}>

                <WrapperContainerRight>
                    <h1 >Xin Chào</h1>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng ký tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder='@gmail.com' />

                    {/* <InputForm placeholder='password' /> */}
                    <div style={{ fontSize: '18px', position: "relative" }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: '20px',
                                right: '10px'
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            style={{ marginBottom: "15px" }}
                            placeholder="password"
                            type={isShowPassword ? "text" : "password"}
                        />
                    </div>
                    {/* <InputForm style={{ marginBottom: '10px' }} placeholder='comfirm password' /> */}
                    <div style={{ fontSize: '18px', position: "relative" }}>
                        <span
                            onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: '20px',
                                right: '10px'
                            }}
                        >
                            {isConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            style={{ marginBottom: "15px" }}
                            placeholder="confirm password"
                            type={isConfirmPassword ? "text" : "password"}
                        />
                    </div>



                    <ButtonComponent
                        bordered={false}
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
                        Bạn đã có tài khoản?<WrapperTextLight> Đăng nhập</WrapperTextLight></p>

                </WrapperContainerRight>
            </div>
        </div>

    )

}

export default SignInPage