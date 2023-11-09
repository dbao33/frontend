import { Divider, Table } from 'antd'
import React, { useState } from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent'


const TableComponent = (props) => {
    const { selectionType = 'checkbox', data:dataSource = [], isLoading = false, columns = [], handleDeletedMany = [] } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    }

    const handleDeleteAll = () => {
        handleDeletedMany(rowSelectedKeys)
    }
    
    return ( 
        <div>
        <Divider style={{ margin: '10px' }} />
            <LoadingComponent isLoading={isLoading}>
                {rowSelectedKeys.length > 0 && (
                    <div style={{
                        background: '#1d1ddd',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '10px',
                        cursor: 'pointer'
                    }}
                        onClick={handleDeleteAll}
                    >
                        Xóa tất cả
                    </div>
                )}
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    {...props}
                />
            </LoadingComponent>
        </div>
    )
}

export default TableComponent