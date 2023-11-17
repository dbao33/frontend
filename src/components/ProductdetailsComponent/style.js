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
export const WrapperStyleNameProduct = styled.div`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    font-weight: bold;
    line-height: 32px;
    word-break: break-word;
`

export const WrapperStyleTextSell = styled.span`
    color: rgb(120, 120, 120);
    font-size: 15px;
    line-height: 24px;
`

export const WrapperPriceProduct = styled.div`
    background: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperPriceTextProduct = styled.div`
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

export const WrapperTextLight = styled.span`
    color: rgb(0, 113, 227);
    font-size: 16px;
    cursor: pointer;
`
export const Title = styled.div`
    width: 292px;
    height: 56px;
    line-height: 56px;
    margin-right: 19px;
    font-size: 16px;
    text-align: center;
    &:after {
        content: "";
        display: block;
        width: 0;
        height: 2px;
        background: rgb(76,27,133);
        transition: width .3s;
    }
    &:hover::after {
        width: 100%;
    }
`
export const WrapContent = styled.div`
        width: 1200px;
        margin: 20px auto;
        margin-bottom: 40px;
        padding: 10px;
        height: 300px;
        border-radius: 20px;
        font-size: 16px;
        white-space: pre-line;
        text-align: justify;
        border: 1px solid #eae7e7;
`
export const TableContent = styled.table`
        width: 1200px;
        margin: 20px auto;
        margin-bottom: 40px;
        padding: 10px;
        height: 300px;
        border-radius: 20px;
        font-size: 16px;
        white-space: pre-line;
        text-align: justify;
        border: 1px solid #eae7e7;
`
export const ContentDescription = styled.p`
        margin: 2rem 10px;
`
export const AttributeItem = styled.th`
    width: 40%;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    padding-left: 20px;
    text-align: center;
`
export const AttributeValue = styled.th`
    width: 60%;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    padding-left: 20px;
    text-align: center;
`