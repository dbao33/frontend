import React, { useEffect, useState } from 'react'
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Form, Modal, Select } from 'antd'
import { WrapperHeader, WrapperUploadFile } from '../AdminUser/style'
import InputComponent from '../InputComponent/InputComponent'
import { UploadOutlined } from '@ant-design/icons'
import useMutationHooks from '../../hooks/UseMutationHook'
import * as ProductService from '../../services/ProductService'
import * as Message from '../../components/Message/Message'
import { getBase64, renderOptions } from '../../untils'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useQuery } from '@tanstack/react-query'

const AdminProduct = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [product, setProduct] = useState({
        name: '',
        image: '',
        price: '',
        description: '',
        rating: '',
        type: '',
        countInStock: '',
        newType: '',
    })

    const [form] = Form.useForm()

    const mutation = useMutationHooks((data) => {
        const {
            name,
            image,
            price,
            description,
            rating,
            type,
            countInStock: countInStock,
        } = data

        const response = ProductService.createProduct({
            name,
            image,
            price,
            description,
            rating,
            type,
            countInStock,
        })
        return response
    })

    const getAllProducts = async () => {
        const response = await ProductService.getAllProduct()
        return response;
    }
    const { data, isLoading, isError, isSuccess } = mutation

    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    })

    const renderAction = () => {

        return (
          <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}  />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}  />
          </div>
        )
      }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Type',
            dataIndex: 'type',
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
            discount: product.discount
        }
        mutation.mutate(params, product)
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
        })
        form.resetFields();
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
    const handleOnchange = (e) => {
        setProduct({
            ...product,
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
        <>
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
            <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} />
            <Modal
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

            </Modal>

        </>
    )
}

export default AdminProduct