import React, { useEffect, useState } from 'react'
import { Col, Avatar, Popover, Badge } from 'antd'
import {
  WrapperHeader, WrapperTextHeader, WrapperContentPopup, WrapperBage, WrapperText, WrapperCart, WrapperItemsMobile, Wrapper, WrapperItems
} from './style'
import {
  UserOutlined, CaretDownOutlined, ShoppingCartOutlined
} from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slices/userSlice'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { searchProduct } from '../../redux/slices/ProductSlice'

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navige = useNavigate()
  const handleNavigateHome = () => {
    navige('/')
  }
  const handleNavigateLogin = () => {
    navige('/sign-in')
  }

  const [isOpenPopOver, setIsOpenPopOver] = useState(false)
  const handleClickNavigate = (type) => {
    if (type === 'profile') {
      navige('/profile-user')
    } else if (type === 'admin') {
      navige('/admin')
    } else if (type === 'my-order') {
      navige('/my-order', {
        state: {
          id: user?.id,
          token: user?.access_token
        }
      })
    } else {
      handleLogout()
    }
    setIsOpenPopOver(false)
  }
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const order = useSelector((state) => state.order)
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

      <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>
        Thông tin người dùng
      </WrapperContentPopup>

      <WrapperContentPopup
        onClick={() => handleClickNavigate('my-order')}
      >
        Đơn hàng của tôi
      </WrapperContentPopup>

      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>
          Quản lí website
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>
    </div>
  )

  // const [search, setSearch] = useState('')
  // const onSearch = (e) => {
  //   setSearch(e.target.value)
  //   dispatch(searchProduct(e.target.value))
  // }
  const [keyword, setKeyword] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const searchUrl = `/search?keyword=${encodeURIComponent(keyword)}`
      //encodeURIComponent mã hóa kí tự đặc biệt
      navige(searchUrl)
    }
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
    dispatch(searchProduct(event.target.value))
  }
  return (
    <Wrapper>
      <WrapperHeader
        style={{ justifyContent: isHiddenSearch ? 'space-between' : 'unset' }}>

        <Col
          xl={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <WrapperTextHeader onClick={handleNavigateHome}>SRuy Shop</WrapperTextHeader>
        </Col>

        {!isHiddenSearch && (
          <Col xs={20} xl={14}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <ButtonInputSearch
              size='large'
              type='text'
              // textButton='Tìm kiếm'
              placeholder='Nhập nội dung muốn tìm kiếm!'
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </Col>
        )}

        <Col xs={4} xl={5} style={{ display: 'flex', justifyContent: 'center', gap: ' 60px', alignItems: 'center' }}>

          {!isHiddenCart && (
            <LoadingComponent isLoading={loading}>
              <WrapperBage style={{ fontSize: '15px', insetInlineEnd: '12px' }} count={order?.orderItems?.length}
              >
                <WrapperCart
                  style={{ cursor: 'pointer' }}
                  onClick={() => navige('/order')}
                >
                  <ShoppingCartOutlined style={{ fontSize: '40px' }} />
                </WrapperCart>
              </WrapperBage>
            </LoadingComponent>
          )}

          <LoadingComponent isLoading={loading}>
            <WrapperItemsMobile style={{ marginRight: '60px', marginLeft: '90px', cursor: 'pointer' }}>

              {/* ten dang nhap */}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger='click' open={isOpenPopOver}>
                    <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpenPopOver(!isOpenPopOver)}>
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
                        />)
                      }
                      <WrapperText style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        {/* {userName?.length ? userName : user?.email} */}
                      </WrapperText>

                      <CaretDownOutlined />
                    </div>
                  </Popover>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleNavigateLogin}>

                    <Avatar size={40}
                      style={{ backgroundColor: '#fff' }}
                      icon={<UserOutlined
                        style={{ color: '#000', fontSize: '30px' }}
                      />}
                    />
                  </div>
                </>
              )}

            </WrapperItemsMobile>
          </LoadingComponent>
          {/* laptop */}
          <LoadingComponent isLoading={loading}>
            <WrapperItems>

              {/* ten dang nhap */}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger='click' open={isOpenPopOver}>
                    <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsOpenPopOver(!isOpenPopOver)}>
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
                        />)
                      }
                      <WrapperText style={{ cursor: 'pointer', marginLeft: '5px' }}>
                        {userName?.length ? userName : user?.email}
                      </WrapperText>

                      <CaretDownOutlined />
                    </div>
                  </Popover>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }} onClick={handleNavigateLogin}>

                    <Avatar size={40}
                      style={{ backgroundColor: '#fff' }}
                      icon={<UserOutlined
                        style={{ color: '#000', fontSize: '30px' }}
                      />}
                    />

                  </div>
                </>
              )}

            </WrapperItems>
          </LoadingComponent>
        </Col>
      </WrapperHeader>
    </Wrapper>

  )
}

export default HeaderComponent