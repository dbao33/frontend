import React from 'react'
import {
    StyleNameProduct, WrapperReportText, WrapperStyleTextSell,
    WrapperPriceText, WrapperPriceDiscountText, WrapperCardStyle
} from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'

const CardComponent = (props) => {
    const { countInStock, description, image,
        name, price, rating, type, discount, selled, id } = props
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            headStyle={{ width: '200px', height: '200px' }}
            bodyStyle={{ padding: '10px' }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}

        >
            <img
                src={logo}
                alt="logo"
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
            <WrapperPriceText>{price}
                <WrapperPriceDiscountText style={{ marginLeft: '6px' }}>
                    {discount || 5}%
                </WrapperPriceDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent