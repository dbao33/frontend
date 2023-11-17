import styled from 'styled-components'
import { Badge, Row } from 'antd'

export const WrapperHeader = styled(Row)`
    padding: 14px 120px;
    background-image: 
    
    linear-gradient(183deg, rgba(23,3,93,1) 4%, rgba(152,33,165,1) 50%, rgba(29,4,76,1) 96%);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    border-bottom: 1px solid rgb(5,5,7);
`
export const WrapperBage = styled(Badge)`
    &.ant-badge.ant-badge-count {
        inset-inline-end: -15px !important;
    }
`
export const WrapperTextHeader = styled.span`
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    user-select: none;
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px
    font-size: 16px;
    white-space: nowrap;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(1, 82, 215);
        white-space: nowrap;
    }
`
export const HeaderProfile = styled(Row)`
  
`
