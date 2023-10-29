import styled from "styled-components"
import { Row } from 'antd'

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #050507;
    color: #fff;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
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
