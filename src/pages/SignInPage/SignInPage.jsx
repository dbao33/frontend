import React from 'react'
import { WrapperContainerLeft, WrapperContainerRight } from './style'
import { Image } from 'antd'
import imageLogo from '../../assets/images/sign-in.png'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { WrapperTextLight } from '../TypeProductPage/style'
const SignInPage = () => {
    return (
      
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  background: 'linear-gradient(136deg, rgb(240, 248, 255) -1%, rgb(219, 238, 255) 85%)' , height: '100vh'}}>
            <WrapperContainerLeft>
            <Image src={imageLogo} preview={false} alt='sign-in' height='auto' width='403px' math-width='540px'></Image>
            </WrapperContainerLeft>

            <div style={{ width: '500px', height: '445px', borderRadius: '6px', background: '#fff' }}>

                <WrapperContainerRight>
                    <h1 >Xin Chào</h1>
                    <p style={{ fontSize: '16px' }}>Vui lòng đăng nhập tài khoản</p>
                    <InputForm  style={{ marginBottom: '10px'}} placeholder='@gmail.com' />
                    <InputForm placeholder='password'/>
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
                        textButton={'Đăng nhập'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    >
                    </ButtonComponent>
                    
                    <p style={{ fontSize: '16px' }}>
                        <WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
                    
                    <p style={{ fontSize: '16px' }}>
                        Chưa có tài khoản?<WrapperTextLight> Tạo tài khoản</WrapperTextLight></p>
                    
                </WrapperContainerRight>
            </div>
        </div>
        
    )
    
}

export default SignInPage