import React from 'react'
import { Col, Avatar } from 'antd'
import {
  WrapperHeader, WrapperTextHeader, WrapperHeaderAccout,
  WrapperTextHeaderSmall
} from './type'
import {
  UserOutlined, CaretDownOutlined, ShoppingCartOutlined
} from '@ant-design/icons'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch'
import { useNavigate } from 'react-router-dom'
const HeaderComponent = () => {
  const navige = useNavigate()
  const handleNavigateHome = () => {
    navige('/')
  }
  return (
    <div>
      <WrapperHeader >
        <Col span={5}>
          <WrapperTextHeader onClick={handleNavigateHome}>ABC_Shop</WrapperTextHeader>
        </Col>
        <Col span={13} >
          <ButtonInputSearch
            size='large'
            bordered={false}
            textButton='Tìm kiếm'
            placeholder='Nhập nội dung muốn tìm kiếm!'
          //onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center', gap: ' 30px', alignItems: 'center' }}>
          <WrapperHeaderAccout style={{ marginLeft: '30px' }}>
            <ShoppingCartOutlined style={{ fontSize: '40px' }} />
            <span >Giỏ hàng</span>
          </WrapperHeaderAccout>

          <WrapperHeaderAccout>
            <Avatar size={40} style={{ backgroundColor: '#fff' }} icon={<UserOutlined style={{ color: '#000', fontSize: '30px' }} />} />

            <span style={{ marginLeft: '5px' }}>Tài khoản</span>
            <CaretDownOutlined />
          </WrapperHeaderAccout>

        </Col>
      </WrapperHeader>
    </div>

  )
}

export default HeaderComponent