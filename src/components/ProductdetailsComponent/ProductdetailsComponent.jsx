import React, { useState } from 'react'
import { Col, Rate, Row } from 'antd'
import {
    WrapperStyleImageSmall, WrapperStyleCollImage, WrapperStyleNameProduct,
    WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct,
    WrapperAddressProduct, WrapperQuanlityProduct, WrapperInputNumber
} from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { WrapperTextLight } from '../../pages/TypeProductPage/style'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import { useSelector } from 'react-redux'

const ProductdetailsComponent = ({ idProduct }) => {

    const user = useSelector((state) => state.user)
    const [quantity, setQuantity] = useState(1)

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

    const hanleChangeCount = (type) => {
        if (type === 'increase') {
            setQuantity(quantity + 1)
        } else if (type === 'decrease') {
            setQuantity(quantity - 1)
        }
    }


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

                    <Row style={{ padding: '10px', justifyContent: 'space-between' }}>

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


                    </Row>
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
                            {productDetails?.price} ₫
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
                                onClick={() => hanleChangeCount('decrease')} >
                                <MinusOutlined
                                    style={{ color: '#000', fontSize: '20px ' }}

                                />
                            </button>

                            <WrapperInputNumber
                                onChange={onChange}
                                size='middle'
                                value={quantity}
                                max={10}
                                min={1}
                            />

                            <button
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                }}
                                onClick={() => hanleChangeCount('increase')}
                            >
                                <PlusOutlined
                                    style={{ color: '#000', fontSize: '20px ' }}
                                />
                            </button>
                        </WrapperQuanlityProduct>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignContent: 'center',
                        gap: '12px'
                    }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(5, 5, 7)',
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
                        ></ButtonComponent>

                        <ButtonComponent
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
                        ></ButtonComponent>
                    </div>

                </Col>
            </Row>
        </LoadingComponent>
    )
}

export default ProductdetailsComponent