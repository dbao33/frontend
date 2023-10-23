import React, {useState} from 'react'
import { Col, Avatar, Button, Popover } from 'antd'
import {
  WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperContentPopup
} from './type'
import {
  UserOutlined, CaretDownOutlined, ShoppingCartOutlined
} from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as UserService from '../../services/UserService'

// import { Content } from 'antd/es/layout/layout'
import { logOutUser } from '../../services/UserService'
import {resetUser} from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
const HeaderComponent = () => {
  const navige = useNavigate()
  const handleNavigateHome = () => {
    navige('/')
  }
  const handleNavigateLogin = () => {
    navige('/sign-in')
  }

  const dispatch = useDispatch()
  const [loading, setLoading]=useState(false)
  const handleLogout = async ()=>{
    setLoading(true)
    await UserService.logOutUser()
    dispatch(resetUser())
    setLoading(false)
  } 
  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
      <WrapperContentPopup onClick={handleNavigateLogin}>Thông tin người dùng</WrapperContentPopup>
    </div>
  );

  const user = useSelector((state) => state.user)
  return (
    <div>
      <WrapperHeader >
        <Col span={5}>
          <WrapperTextHeader onClick={handleNavigateHome}>SRuy Shop</WrapperTextHeader>
        </Col>
        <Col span={13} >
          <ButtonInputSearch
            size='large'
            textButton='Tìm kiếm'
            placeholder='Nhập nội dung muốn tìm kiếm!'
          //onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', gap: ' 30px', alignItems: 'center' }}>
        <loading isLoading={loading}>
          <WrapperHeaderAccout style={{ marginLeft: '30px' }}>
            <ShoppingCartOutlined style={{ fontSize: '40px' }} />
            <span >Giỏ hàng</span>
          </WrapperHeaderAccout>
        </loading>
          <LoadingComponent isLoading={loading}>
            <WrapperHeaderAccout style={{ cursor: 'pointer' }}>
              <Avatar size={40} style={{ backgroundColor: '#fff' }} icon={<UserOutlined style={{ color: '#000', fontSize: '30px' }} />} />
              {/* ten dang nhap */}
              {user?.name ? (
                <>
                <Popover content={content} trigger="click">
                  <div style={{ cursor: 'pointer', marginLeft: '5px'}}>{user?.name}</div>
                </Popover>
                </>
              ) : (
                <>
                  <span onClick={handleNavigateLogin} style={{ marginLeft: '5px' }}>Tài khoản</span>
                  
                </>
              )}

              <CaretDownOutlined />
            </WrapperHeaderAccout>
          </LoadingComponent>
          
        </Col>
      </WrapperHeader>
    </div>

  )
}

export default HeaderComponent