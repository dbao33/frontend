import React, { useEffect, useState } from 'react'
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
import { resetUser } from '../../redux/slides/userSlide'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { searchProduct } from '../../redux/slides/ProductSlice'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navige = useNavigate()
  const handleNavigateHome = () => {
    navige('/')
  }
  const handleNavigateLogin = () => {
    navige('/sign-in')
  }
  const handleNavigateAdmin = () => {
    navige('/admin')
  }
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logOutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>

      <WrapperContentPopup onClick={() => navige('/profile-user')}>
        Thông tin người dùng
      </WrapperContentPopup>

      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleNavigateAdmin}>
          Quản lí website
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  )

  const [search, setSearch] = useState('')
  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div>
      <WrapperHeader
        style={{ justifyContent: isHiddenSearch ? 'space-between' : 'unset' }}>

        <Col span={5}>
          <WrapperTextHeader onClick={handleNavigateHome}>SRuy Shop</WrapperTextHeader>
        </Col>

        {!isHiddenSearch && (
          <Col span={13} >
            <ButtonInputSearch
              size='large'
              textButton='Tìm kiếm'
              placeholder='Nhập nội dung muốn tìm kiếm!'
              onChange={onSearch}
            />
          </Col>
        )}

        <Col span={6} style={{ display: 'flex', justifyContent: 'center', gap: ' 30px', alignItems: 'center' }}>

          {!isHiddenCart && (
            <loading isLoading={loading}>

              <WrapperHeaderAccout
                style={{ marginLeft: '30px', cursor: 'pointer' }}
                onClick={() => navige('/order')}
              >
                <ShoppingCartOutlined style={{ fontSize: '40px' }} />
                <span >Giỏ hàng</span>
              </WrapperHeaderAccout>
            </loading>
          )}

          <LoadingComponent isLoading={loading}>
            <WrapperHeaderAccout style={{ cursor: 'pointer' }}>

              {user?.avatar ? (
                <img src={user?.avatar} alt='avatar' style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <Avatar size={40}
                  style={{ backgroundColor: '#fff' }}
                  icon={<UserOutlined
                    style={{ color: '#000', fontSize: '30px' }}
                  />}
                />)}

              {/* ten dang nhap */}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger='click'>
                    <div style={{ cursor: 'pointer', marginLeft: '5px' }}>{userName?.length ? userName : user?.email}</div>
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