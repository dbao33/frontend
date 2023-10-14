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
const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader >
        <Col span={5}>
          <WrapperTextHeader>ABC_Shop</WrapperTextHeader>
        </Col>
        <Col span={13} >
          <ButtonInputSearch 
            size='large' 
            bordered={'bodered'}
            textButton='Tìm kiếm'
            placeholder='Nhập nội dung muốn tìm kiếm!'
          />
        </Col>
        <Col span={6} style={{ display: 'flex',justifyContent: 'center', gap:' 20px', alignItems: 'center' }}>
          <WrapperHeaderAccout>
            <ShoppingCartOutlined style={{ fontSize: '40px' }} />
            <span >Giỏ hàng</span>
          </WrapperHeaderAccout>
          
            <WrapperHeaderAccout>
                <Avatar size={40} style={{ backgroundColor: '#fff' }} icon={<UserOutlined style={{ color: '#000' }} />} />
             
              <span style={{ marginLeft: '5px'}}>Tài khoản</span>
              <CaretDownOutlined />
            </WrapperHeaderAccout>
              
        </Col>
    </WrapperHeader>
    </div>
    
  )
}

export default HeaderComponent