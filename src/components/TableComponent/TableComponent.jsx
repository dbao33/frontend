import { Divider, Table } from 'antd'
import React from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent'

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isLoading = false, columns = [] } = props

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    }
    return (

        <div>

            <Divider style={{ margin: '10px' }} />
            <LoadingComponent isLoading={isLoading}>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </LoadingComponent>
        </div>
    )
}

export default TableComponent