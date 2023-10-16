import React from 'react'
import { Card } from 'antd'
import {
    StyleNameProduct, WrapperReportText, WrapperStyleTextSell,
    WrapperPriceText, WrapperPriceDiscountText, WrapperCardStyle
} from './style'
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'

const CardComponent = () => {
    const { Meta } = Card
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
            <StyleNameProduct>Lenovo</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.5</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell>  |  Da ban 1000+ </WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>19.000.000d
                <WrapperPriceDiscountText style={{ marginLeft: '6px' }}>
                    -15%
                </WrapperPriceDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent