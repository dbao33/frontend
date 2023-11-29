import Card from 'antd/es/card/Card'
import styled from 'styled-components'

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    height: 350px;
    & img {
        height: 200px;
        width: 200px;
    },
    position: relative;
    background - color:${props => props.disabled ? '#ccc' : '#fff'};
    cursor:${props => props.disabled ? 'not-allowed' : 'pointer'};
    & .ant-card-body {
        padding: 10px;
    }
    @media (max-width:1023px) {
        width: 100%;
        & .ant-card-cover >* {
            width: 160px;
        }
        & .ant-card-body {
            padding: 10px 3px;
        }
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    color: rgb(56, 56, 61);
    height: 24px;
    font-size: 16px;
    line-height: 1.5;
    margin: 17px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    @media (max-width:1023px) {
        width: 145px;
        font-size: 14px;
    }
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 4px;
`


export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
    @media (max-width:1023px) {
        font-size: 14px;
    }
    & p {
        margin: 0;
        margin-right: 8px;
        width: fit-content;
        font-size: 13px;
        text-decoration: line-through;
        color: #4E4E4E;
    }
`

export const WrapperPriceDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500;
    @media (max-width:1023px) {
        font-size: 9px;
    }
`

export const WrapperStyleTextSell = styled.span`
    color: rgb(120, 120, 120);
    font-size: 15px;
    line-height: 24px;
`