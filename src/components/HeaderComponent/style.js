import styled from 'styled-components'
import { Badge, Row } from 'antd'

export const WrapperHeader = styled(Row)`
    display: flex;
    max-width: 1440px;
    height: 60px;
    margin: 0 auto;
    
    flex-wrap: nowrap;
`
export const Wrapper = styled.div`
    padding: 14px 120px;
    background-image:
    linear-gradient(183deg, rgba(23,3,93,1) 4%, rgba(152,33,165,1) 50%, rgba(29,4,76,1) 96%);
    // background: rgb(76,27,133);
    align-items: center;
    gap: 16px;
    // border-bottom: 1px solid rgb(5,5,7);
`
export const WrapperBage = styled(Badge)`
    &.ant-badge.ant-badge-count {
        inset-inline-end: -15px !important;
    }
`
export const WrapperTextHeader = styled.span`
    @media (max-width:1023px) {
        display: none ;
    }
    font-size: 25px;
    display: flex;
    color: #fff;
    font-weight: bold;
    text-align: left;
    user-select: none;
`
export const WrapperItems = styled(Row)`
    @media (max-width:1023px) {
        display: none;
    }
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    white-space: nowrap;
`
export const WrapperItemsMobile = styled.div`
    @media (max-width:1023px) {
        display:flex;
    }
    display: none;
    align-items: center;
    position: relative;
    justify-content: center;
    padding: 8px 16px;
    color: #fff;
    font-size: 16px;
    // white-space: nowrap;
    border-radius: 8px;
`
export const WrapperCart = styled(Row)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 24px;
    cursor: pointer;
    @media (max-width:1023px) {
        margin: 0 ;
    }
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(1, 82, 215);
        white-space: nowrap;
    }
`
export const WrapperText = styled(Row)`
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #ccc;
    
`
