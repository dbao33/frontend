import React, { useState } from 'react'
import { Menu } from 'antd'
import { getItem } from '../../untils'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import {
    AppstoreOutlined, UserOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'
import AdminOrder from '../../components/AdminOrder/AdminOrder'

const AdminPage = () => {

    const [keySelected, setKeySelected] = useState('')
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
    ]

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />
            case 'product':
                return <AdminProduct />
            case 'order':
                return <AdminOrder />
            default:
                return <></>
        }
    }

    const handleClick = ({ key }) => {
        setKeySelected(key)
    }

    console.log('setKeySelected', keySelected)
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}>
                <Menu
                    mode='inline'
                    style={{
                        width: 256,
                        height: '100vh',
                    }}
                    items={items}
                    onClick={handleClick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage