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
import { DrawerComponent } from '../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'

const AdminProduct = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const user = useSelector((state) => state?.user)
    const inittial  = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        discount: '',
        countInStock: '',
        newType: '',
      })

    const [product, setProduct] =  useState(inittial())
    const [productDetails, setProductDetails] =  useState(inittial())

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
        })
        return response
    })

    
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
    },)
 
    const fetchGetDetailsProduct = async (rowSelected) => {
        const response = await ProductService.getDetailsProduct(rowSelected)
        if(response?.data){
            setProductDetails({
                name: response?.data?.name,
                image: response?.data?.image,
                price: response?.data?.price,
                description: response?.data?.description,
                rating: response?.data?.rating,
                type: response?.data?.type,
                countInStock: response?.data?.countInStock,
                newType: response?.data?.newType,
            })
        }
        setIsLoadingUpdate(false)
    }
// update product code này có sở dụng
    // const fetchGetDetailsProduct = async (rowSelected) => {
    //     const res = await ProductService.getDetailsProduct(rowSelected);
    //     if (res?.data) {
    //         setProductDetails({
    //             name: res?.data?.name,
    //             price: res?.data?.price,
    //             discount: res?.data?.discount,
    //             description: res?.data?.description,
    //             rating: res?.data?.rating,
    //             image: res?.data?.image,
    //             type: res?.data?.type,
    //             countInStock: res?.data?.countInStock,
    //         })
    //     }
    //     setIsLoadingUpdate(false);
    // }
    useEffect(() => {
        if(!isModalOpen) {
            form.setFieldsValue(productDetails)
        }else {
            form.setFieldsValue(inittial())
        }
        }, [form, productDetails, isModalOpen])

    useEffect(() => {
        if(rowSelected && isOpenDrawer) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const getAllProducts = async () => {
        const response = await ProductService.getAllProduct()
        return response;
    }
    const handleDetailsProduct = () => {
        if(rowSelected ) {
            fetchGetDetailsProduct()
        }
        setIsOpenDrawer(true)
        console.log('rowSelected', rowSelected)
    }

    const { data, isLoading, isError, isSuccess } = mutation
    const { data : dataUpdated, isLoading : isLoadingUpdated, isError : isErrorUpdated, isSuccess : isSuccessUpdated } = mutationUpdate

    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    })
    
    const renderAction = () => {

        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct}/>
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
            
        })
        form.resetFields();
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
                columns={columns} 
                isLoading={isLoadingProducts} 
                data={dataTable} 
                onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => {
                        setRowSelected(record._id)

                    }
                };   
            }}/>
            </div>
            
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
                            label='Discount'
                            name='discount'
                            rules={[
                                {
                                    required: true,
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

            <DrawerComponent 
                title='Chi tiết sản phẩm' 
                isOpen={isOpenDrawer} 
                onClose={() => setIsOpenDrawer(false)} 
                width='50%'>
            <LoadingComponent isLoading={isLoadingUpdate}>
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
            </DrawerComponent>
        </div>

        //     {/* form discount trong update product admin */}
        //     {/* <Form.Item
        //         label="Discount"
        //         name="discount"
        //         rules={[
        //             {
        //                 required: true,
        //                 message: "Please input your price!",
        //             },
        //         ]}
        //     >
        //         <InputComponent
        //             value={productDetails.discount}
        //             onChange={handleOnchangeDetails}
        //             name="discount"
        //         />
        //     </Form.Item> */}
        // </>

    )
}

export default AdminProduct