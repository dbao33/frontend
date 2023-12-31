import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Form, Select, Space } from 'antd'
import { WrapperHeader, WrapperUploadFile } from './style'
import InputComponent from '../InputComponent/InputComponent'
import { UploadOutlined } from '@ant-design/icons'
import useMutationHooks from '../../hooks/UseMutationHook'
import * as ProductService from '../../services/ProductService'
import * as Message from '../../components/Message/Message'
import { getBase64, renderOptions } from '../../untils'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useQuery } from '@tanstack/react-query'
import { DrawerComponent } from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null)
    const user = useSelector((state) => state?.user)
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        discount: '',
        countInStock: '',
        newType: '',
        hardDrive: '',
        cpu: '',
        ram: '',
        monitor: '',
    })

    const [product, setProduct] = useState(inittial())
    const [productDetails, setProductDetails] = useState(inittial())

    const [form] = Form.useForm()

    const mutation = useMutationHooks((data) => {
        const {
            name,
            image,
            price,
            description,
            rating,
            type,
            discount,
            countInStock,
            hardDrive,
            cpu,
            ram,
            monitor

        } = data

        const response = ProductService.createProduct({
            name,
            image,
            price,
            description,
            rating,
            discount,
            type,
            countInStock,
            hardDrive,
            cpu,
            ram,
            monitor
        })
        return response
    })
    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...ids } = data
        const response = ProductService.deleteManyProducts(ids, token)
        return response
    },)

    const mutationUpdate = useMutationHooks((data) => {
        const {
            id,
            token,
            ...rests
        } = data

        const response = ProductService.updateProduct(
            id,
            token,
            { ...rests })
        return response
    },
    )

    const mutationDelete = useMutationHooks((data) => {
        const {
            id,
            token,
        } = data





        const response = ProductService.deleteProduct(
            id,
            token,)
        return response
    },)


    const fetchGetDetailsProduct = async (rowSelected) => {
        const response = await ProductService.getDetailsProduct(rowSelected)
        if (response?.data) {
            setProductDetails({
                name: response?.data?.name,
                image: response?.data?.image,
                price: response?.data?.price,
                description: response?.data?.description,
                rating: response?.data?.rating,
                type: response?.data?.type,
                countInStock: response?.data?.countInStock,
                newType: response?.data?.newType,
                hardDrive: response?.data?.hardDrive,
                cpu: response?.data?.cpu,
                ram: response?.data?.ram,
                monitor: response?.data?.monitor,
            })
        }
        setIsLoadingUpdate(false)
    }


    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(productDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, productDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const getAllProducts = async () => {
        const response = await ProductService.getAllProduct()
        return response
    }
    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const { data, isLoading, isError, isSuccess } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isError: isErrorUpdated, isSuccess: isSuccessUpdated } = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isError: isErrorDeleted, isSuccess: isSuccessDeleted } = mutationDelete
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isError: isErrorDeletedMany, isSuccess: isSuccessDeletedMany } = mutationDeletedMany

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    })
    const { isLoading: isLoadingProducts, data: products } = queryProduct

    const renderAction = () => {

        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ color: 'orange', fontSize: '18px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        // setSearchText(selectedKeys[0])
        // setSearchedColumn(dataIndex)
    }
    const handleReset = (clearFilters) => {
        clearFilters()
        // setSearchText('')
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size='small'
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
    })

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction

        },
    ]
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    const onFinish = () => {
        const params = {
            name: product.name,
            price: product.price,
            description: product.description,
            rating: product.rating,
            image: product.image,
            type: product.type === 'add type' ? product.newType : product.type,
            countInStock: product.countInStock,
            discount: product.discount,
            hardDrive: product.hardDrive,
            cpu: product.cpu,
            ram: product.ram,
            monitor: product.monitor,

        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setProduct({
            name: '',
            image: '',
            price: '',
            description: '',
            rating: '',
            type: '',
            countInStock: '',
            hardDrive: '',
            cpu: '',
            ram: '',
            monitor: '',
        })
        form.resetFields()
    }
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    // khi tao 1 san moi thanh cong thi
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            Message.success()
            handleCancel()
        } else if (isError) {
            Message.error()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            Message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            Message.error()
        }
    }, [isSuccessDeleted])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            Message.success()
        } else if (isErrorDeletedMany) {
            Message.error()
        }
    }, [isSuccessDeletedMany])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false)
        setProductDetails({
            name: '',
            image: '',
            price: '',
            description: '',
            rating: '',
            type: '',
            countInStock: '',
            hardDrive: '',
            cpu: '',
            ram: '',
            monitor: '',

        })
        form.resetFields()
    }

    useEffect(() => {
        if (isSuccessUpdated && data?.status === 'OK') {
            Message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            Message.error()
        }
    }, [isSuccessUpdated])



    const handleOnchange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        })
    }
    const handleOnchangeDetails = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value,
        })
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setProduct({
            ...product,
            image: file.preview,
        })
    }

    const handleOnChangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setProductDetails({
            ...productDetails,
            image: file.preview,
        })
    }

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...productDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    // type product
    const [typeProduct, setTypeProduct] = useState([])
    const [typeSelect, setTypeSelect] = useState('')
    // select
    const handleChangeSelect = (value) => {
        setProduct({
            ...product,
            type: value,
        })
    }
    const fetchTypeProduct = async () => {
        const response = await ProductService.getAllTypeProducts()
        return response
    }
    const TypeProduct = useQuery({
        queryKey: ['type-product'],
        queryFn: fetchTypeProduct,
    })


    return (
        <div>
            <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
            <div style={{ marginTop: '10px' }}>
                <Button
                    style={{
                        height: '120px',
                        width: '120px',
                        borderRadius: '6px',
                        borderStyle: 'dashed',
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>

            <div>
                <TableComponent
                    handleDeletedMany={handleDeleteManyProducts}
                    columns={columns}
                    isLoading={isLoadingProducts}
                    data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id)

                            }
                        }
                    }} />
            </div>

            <ModalComponent forceRender
                title='Tạo sản phẩm'
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <LoadingComponent isLoading={isLoading}>
                    <Form
                        name='basic'
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={onFinish}
                        autoComplete='off'
                        form={form}
                    >
                        <Form.Item
                            label='Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.name}
                                onChange={handleOnchange}
                                name='name'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Type'
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >

                            <Select
                                name='type'
                                style={{
                                    maxWidth: 600,
                                }}
                                value={product.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(TypeProduct?.data?.data)}
                            />
                            {product.type === 'add type' && (
                                <Form.Item
                                    label='New type'
                                    name='newType'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your type!',
                                        },
                                    ]}
                                >
                                    <InputComponent
                                        value={product.newType}
                                        onChange={handleOnchange}
                                        name='newType'
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item
                            label='Count InStock'
                            name='countInStock'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your count InStock!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.countInStock}
                                onChange={handleOnchange}
                                name='countInStock'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Rating'
                            name='rating'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.rating}
                                onChange={handleOnchange}
                                name='rating'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Price'
                            name='price'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.price}
                                onChange={handleOnchange}
                                name='price'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Description'
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your  description!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.description}
                                onChange={handleOnchange}
                                name='description'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Discount'
                            name='discount'
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your discount!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.discount}
                                onChange={handleOnchange}
                                name='discount'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Hard Drive'
                            name='hardDrive'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your hardDrive!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.hardDrive}
                                onChange={handleOnchange}
                                name='hardDrive'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Cpu'
                            name='cpu'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your cpu!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.cpu}
                                onChange={handleOnchange}
                                name='cpu'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Ram'
                            name='ram'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your ram!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.ram}
                                onChange={handleOnchange}
                                name='ram'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Monitor'
                            name='monitor'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your monitor!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.monitor}
                                onChange={handleOnchange}
                                name='monitor'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Image'
                            name='image'
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                                {product?.image && (
                                    <img
                                        src={product?.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                        alt='avatar'
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type='primary' htmlType='submit'>
                                Tạo
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>

            </ModalComponent>

            <DrawerComponent
                title='Chi tiết sản phẩm'
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width='50%'>
                <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>
                    <Form
                        name='basic'
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={onUpdateProduct}
                        autoComplete='off'
                        form={form}
                    >
                        <Form.Item
                            label='Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={productDetails.name}
                                onChange={handleOnchangeDetails}
                                name='name'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Type'
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >

                            <Select
                                name='type'
                                style={{
                                    maxWidth: 600,
                                }}
                                value={productDetails.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(TypeProduct?.data?.data)}
                            />
                            {productDetails.type === 'add type' && (
                                <Form.Item
                                    label='New type'
                                    name='newType'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your type!',
                                        },
                                    ]}
                                >
                                    <InputComponent
                                        value={productDetails.newType}
                                        onChange={handleOnchangeDetails}
                                        name='newType'
                                    />
                                </Form.Item>
                            )}
                        </Form.Item>
                        <Form.Item
                            label='Count InStock'
                            name='countInStock'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your count InStock!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={productDetails.countInStock}
                                onChange={handleOnchangeDetails}
                                name='countInStock'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Rating'
                            name='rating'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={productDetails.rating}
                                onChange={handleOnchangeDetails}
                                name='rating'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Price'
                            name='price'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={productDetails.price}
                                onChange={handleOnchangeDetails}
                                name='price'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Description'
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your  description!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={productDetails.description}
                                onChange={handleOnchangeDetails}
                                name='description'
                            />
                        </Form.Item>


                        <Form.Item
                            label='Discount'
                            name='discount'
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your  discount!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={productDetails.discount}
                                onChange={handleOnchangeDetails}
                                name='discount'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Hard Drive'
                            name='hardDrive'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your hardDrive!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.hardDrive}
                                onChange={handleOnchangeDetails}
                                name='hardDrive'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Cpu'
                            name='cpu'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your cpu!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.cpu}
                                onChange={handleOnchangeDetails}
                                name='cpu'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Ram'
                            name='ram'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your ram!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.ram}
                                onChange={handleOnchangeDetails}
                                name='ram'
                            />
                        </Form.Item>
                        <Form.Item
                            label='Monitor'
                            name='monitor'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your monitor!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={product.monitor}
                                onChange={handleOnchangeDetails}
                                name='monitor'
                            />
                        </Form.Item>

                        <Form.Item
                            label='Image'
                            name='image'
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <WrapperUploadFile onChange={handleOnChangeAvatarDetails} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                                {productDetails?.image && (
                                    <img
                                        src={productDetails?.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px',
                                        }}
                                        alt='avatar'
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 16,
                            }}
                        >
                            <Button type='primary' htmlType='submit'>
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadingComponent>
            </DrawerComponent>

            <ModalComponent
                title='Xoá sản phẩm'
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}
            >
                <LoadingComponent isLoading={isLoadingDeleted}>
                    <div>Bạn có muốn xoá sản phẩm này không ?</div>
                </LoadingComponent>

            </ModalComponent>

        </div>


    )
}

export default AdminProduct