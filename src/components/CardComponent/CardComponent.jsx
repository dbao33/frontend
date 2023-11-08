import React from 'react'
import {
    StyleNameProduct, WrapperReportText, WrapperStyleTextSell,
    WrapperPriceText, WrapperPriceDiscountText, WrapperCardStyle
} from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../untils'

const CardComponent = (props) => {
    const { countInStock, description, image,
        name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailProduct = (id) => {
        navigate(`/product-details-page/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            onClick={() => countInStock !== 0 && handleDetailProduct(id)}
            disable={countInStock === 0}
            style={{ width: 200 }}
            headStyle={{ width: '200px', height: '200px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt='example' src={image} />}

        >
            <img
                src={logo}
                alt='logo'
                style={{
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px',
                    position: 'absolute',
                    height: '14px',
                    width: '68px'
                }}
            />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span> <StarFilled style={{ fontSize: '15px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> |  Đã bán {selled || 1000}+ </WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>{convertPrice(price)}
                <WrapperPriceDiscountText style={{ marginLeft: '6px' }}>
                    - {discount || 5}%
                </WrapperPriceDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent