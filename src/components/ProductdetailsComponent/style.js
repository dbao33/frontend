import { Col, Image, InputNumber } from 'antd'
import styled from 'styled-components'

export const WrapperStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperStyleCollImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;
`

export const WrapperStyleTextSell = styled.span`
    color: rgb(120, 120, 120);
    font-size: 15px;
    line-height: 24px;
`

export const WrapperPriceProduct = styled.h1`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.h1`
    font-size: 32px;
    font-weight: 500;
    line-height: 40px;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperAddressProduct = styled.div`
    span.address {
        font-size: 15px;
        font-weight: 500;
        line-height: 24px;
        text-overflow: ellipsis;
        text-decoration: underline;
        white-space: nowrap;
        overflow: hidden;
    },
    span.change-address {
        font-size: 16px;
        color: rgba(11, 116, 229);
        font-weight: 500;
        line-height: 24px;
    }
`

export const WrapperQuanlityProduct = styled.div`
    display: flex;
    gap: 4;
    align-items: center;
    max-width: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`



export const WrapperInputNumber = styled(InputNumber)`
   &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
        display: none !important;
    }
   };
`