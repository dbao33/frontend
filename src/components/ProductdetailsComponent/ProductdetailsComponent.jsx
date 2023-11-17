import React, { useEffect, useState } from 'react'
import { Col, Rate, Row } from 'antd'
import {
    WrapperStyleImageSmall, WrapperStyleCollImage, WrapperStyleNameProduct,
    WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct,
    WrapperAddressProduct, WrapperQuanlityProduct, WrapperInputNumber,
    WrapperTextLight
} from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addOrderProduct } from '../../redux/slices/orderSlice'
import { convertPrice } from '../../untils'
import * as Message from '../Message/Message'

const ProductdetailsComponent = ({ idProduct }) => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [quantity, setQuantity] = useState(1)
    const navigate = useNavigate()
    // dùng để lưu địa chỉ khi đăng nhập không mất địa chỉ sản phẩm
    const location = useLocation()

    const onChange = (value) => {
        setQuantity(Number(value))
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        const response = await ProductService.getDetailsProduct(id)
        return response.data
    }

    const { isLoading, data: productDetails } = useQuery(
        ['product-details', idProduct],
        fetchGetDetailsProduct,
        {
            enabled: !!idProduct,
        }
    )
    // xử lí sự kiện ấn chọn mua sản phẩm
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find(
                (item) => item.product === productDetails?._id
            )
            if (
                (orderRedux?.amount + quantity) <= orderRedux?.countInstock ||
                (!orderRedux && productDetails?.countInStock > 0)
            ) {
                dispatch(
                    addOrderProduct({
                        orderItem: {
                            name: productDetails?.name,
                            amount: quantity,
                            image: productDetails?.image,
                            price: productDetails?.price,
                            product: productDetails?._id,
                            discount: productDetails?.discount,
                            countInstock: productDetails?.countInStock,
                        },
                    })
                )
                Message.success('Đã thêm vào giỏ hàng')
            } else {
                setErrorLimitOrder(true)
            }
        }
    }
    const hanleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setQuantity(quantity + 1)
            }
        } else {
            if (!limited) {
                setQuantity(quantity - 1)
            }
        }
    }

    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)


    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if ((orderRedux?.amount + quantity) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [quantity])





    return (
        <LoadingComponent isLoading={isLoading || false}>

            <Row style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
                <Col span={10}
                    style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <WrapperStyleImageSmall
                        src={productDetails?.image}
                        alt='image product'
                        preview={false}
                    />

                    {/* <Row style={{ padding: '10px', justifyContent: 'space-between' }}>

                        <WrapperStyleCollImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt='image product'
                                preview={false} />
                        </WrapperStyleCollImage>
                        <WrapperStyleCollImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt='image product'
                                preview={false} />
                        </WrapperStyleCollImage>
                        <WrapperStyleCollImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt='image product'
                                preview={false} />
                        </WrapperStyleCollImage>
                        <WrapperStyleCollImage span={4}>
                            <WrapperStyleImageSmall
                                src={productDetails?.image}
                                alt='image product'
                                preview={false} />
                        </WrapperStyleCollImage>


                    </Row> */}
                </Col>

                <Col span={14} style={{ paddingLeft: '10px' }}>
                    {/* tên sản phẩm */}
                    <WrapperStyleNameProduct >
                        {productDetails?.name}
                    </WrapperStyleNameProduct>
                    {/* đánh giá của sp */}
                    <div>
                        <Rate
                            allowHalf
                            value={productDetails?.rating}
                            defaultValue={productDetails?.rating} />
                        <WrapperStyleTextSell>
                            || Đã bán {productDetails?.selled || 1000}+
                        </WrapperStyleTextSell>
                    </div>
                    {/* Giá của sp */}
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {convertPrice(productDetails?.price)}
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    {/* địa chỉ giao hàng */}
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>
                            {user?.address}
                        </span>
                        '-'
                        <WrapperTextLight className='change-address'>
                            Đổi địa chỉ
                        </WrapperTextLight>
                    </WrapperAddressProduct>


                    <div style={{
                        margin: '10px 0 20px',
                        padding: '10px 0',
                        borderTop: '1px solid #e5e5e5',
                        borderBottom: '1px solid #e5e5e5'
                    }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQuanlityProduct>
                            <button
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                                onClick={() => hanleChangeCount('decrease', quantity === 1)} >
                                <MinusOutlined
                                    style={{ color: '#000', fontSize: '20px ' }}

                                />
                            </button>

                            <WrapperInputNumber
                                onChange={onChange}
                                size='middle'
                                value={quantity}
                                max={productDetails?.countInStock}
                                min={1}
                            />

                            <button
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                                disabled={errorLimitOrder}
                                onClick={() => hanleChangeCount(
                                    'increase',
                                    quantity === productDetails?.countInStock
                                )}
                            >
                                <PlusOutlined
                                    style={{ color: '#000', fontSize: '20px ' }}
                                />
                            </button>
                        </WrapperQuanlityProduct>
                    </div>

                    {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm đã hết hàng</div>}

                    <div style={{
                        display: 'flex',
                        alignContent: 'center',
                        gap: '12px'
                    }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'linear-gradient(183deg, rgba(76,27,133,1) 17%, rgba(184,72,213,0.938813025210084) 50%, rgba(49,15,84,1) 87%)',
                                height: '48px',
                                width: '220px',
                                borderRadius: '4px',
                                border: 'none'
                            }}
                            textButton={'Chọn mua'}
                            styleTextButton={{
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: '700'
                            }}
                            onClick={handleAddOrderProduct}
                        ></ButtonComponent>

                        {/* <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                borderRadius: '4px',
                                border: '1px solid #0071e3'
                            }}
                            textButton={'Mua trả sau '}
                            styleTextButton={{
                                color: '#0071e3',
                                fontSize: '15px',
                                fontWeight: '700'
                            }}
                        ></ButtonComponent> */}
                    </div>

                </Col>
            </Row>
        </LoadingComponent>
    )
}

export default ProductdetailsComponent