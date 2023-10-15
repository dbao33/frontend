import styled from 'styled-components'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
    font-size: 18px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: rgb(5, 5, 7);
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align: center;
`
export const WrapperProducts = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 20px;
`