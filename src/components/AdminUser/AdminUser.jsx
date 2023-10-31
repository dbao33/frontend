import React from 'react'
import { WrapperHeader } from './style'
import { PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { Button } from 'antd'

const AdminUser = () => {
    return (
        <>
            <WrapperHeader>Quản lí người dùng</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{
                        height: '120px',
                        width: '120px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                    }}
                >
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <TableComponent />
        </>
    )
}

export default AdminUser