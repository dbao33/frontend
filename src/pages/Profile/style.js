import Upload from 'antd/es/upload/Upload'
import styled from 'styled-components'

export const HeaderProfile = styled.h1`
    padding: 0 120px;
    color: #000;
    font-size: 25px;
    font-weight: bold;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    display: flex;
    justify-content: center; 
`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 500px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 20px;
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600;
    width: 60px;
    text-align: left;
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload-list-item-container {
        display: none
    }
`