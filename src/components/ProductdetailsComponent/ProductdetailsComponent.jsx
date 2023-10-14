import React from 'react'
import { Col, Row} from 'antd'
import imageProduct from '../../assets/images/dell1.jpg'
import imageProductSmall from '../../assets/images/dell2.jpg'
import {
    WrapperStyleImageSmall, WrapperStyleCollImage, WrapperStyleNameProduct,
    WrapperStyleTextSell, WrapperPriceProduct, WrapperPriceTextProduct,
    WrapperAddressProduct, WrapperQuanlityProduct, WrapperInputNumber
} from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
const ProductdetailsComponent = () => {
    const onChange = () => { }
    return (
      
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                <WrapperStyleImageSmall src={imageProduct} alt='image product' preview={false} />
                <Row style={{ padding: '10px', justifyContent: 'space-between' }}>
                    
                    <WrapperStyleCollImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
                    </WrapperStyleCollImage>

                    <WrapperStyleCollImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
                    </WrapperStyleCollImage>

                    <WrapperStyleCollImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
                    </WrapperStyleCollImage>

                    <WrapperStyleCollImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
                    </WrapperStyleCollImage>

                    <WrapperStyleCollImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
                    </WrapperStyleCollImage>

                    <WrapperStyleCollImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt='image product' preview={false} />
                    </WrapperStyleCollImage>
                    
                </Row>
            </Col>

            <Col span={14} style={{ paddingLeft: '10px' }}>
                {/* tên sản phẩm */}
                <WrapperStyleNameProduct >
                    Laptop Dell Inspiron 14 7430 2-in-1 i7 1355U/16GB/512GB/Touch/Pen/OfficeHS/Win11 (i7U165W11SLU)
            
                </WrapperStyleNameProduct>
                {/* đánh giá của sp */}
                <div>
                    <StarFilled  style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled  style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <StarFilled  style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                    <WrapperStyleTextSell>  |  Da ban 1000+ </WrapperStyleTextSell>
                </div>
                {/* Giá của sp */}
                <WrapperPriceProduct>
                    <WrapperPriceTextProduct> 27.990.000₫ </WrapperPriceTextProduct>
                </WrapperPriceProduct>
                {/* địa chỉ giao hàng */}
                <WrapperAddressProduct>
                    <span>Giao đến </span>
                    <span className="address">Giao tới Phường 7, Quận Gò Vấp, Hồ Chí Minh</span>
                    <span className="change-address">Đổi địa chỉ</span>
                </WrapperAddressProduct>


                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5'}}>
                    <div style={{ marginBottom: '10px'}}>Số lượng</div>
                    <WrapperQuanlityProduct>
                        <button style={{ border: 'none', background: 'transparent' }} >
                            <MinusOutlined style={{ color: '#000', fontSize: '20px '}}/>
                        </button>

                        <WrapperInputNumber defaultValue={1} onChange={onChange} size='middle' />
                        
                        <button style={{ border: 'none', background: 'transparent' }} >
                            <PlusOutlined style={{ color: '#000', fontSize: '20px '}}/>
                        </button>
                    </WrapperQuanlityProduct>
                </div>
                
                    <div style={{ display: 'flex', alignContent: 'center', gap: '12px'}}>
                        <ButtonComponent 
                        bordered={false} 
                            size={40}
                            styleButton={{
                            background: 'rgb(5, 5, 7)',
                            height: '48px',
                            width: '220px',
                            borderRadius: '4px',
                            border: 'none'
                        }}
                        textButton={'Chọn mua'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                        <ButtonComponent 
                        bordered={false} 
                            size={40}
                            styleButton={{
                            background: '#fff',
                            height: '48px',
                            width: '220px',
                            borderRadius: '4px',
                            border: '1px solid #0071e3'
                        }}
                        textButton={'Mua trả sau '}
                        styleTextButton={{ color: '#0071e3', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                </div>

            </Col>
        </Row>
    )
}

export default ProductdetailsComponent