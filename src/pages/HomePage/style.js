import styled from 'styled-components'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
export const WrapperTypeProduct = styled.div`
    @media (max-width:1023px) {
        padding: 10px;
    }
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-around;
    height: 36px;
    font-size: 18px;
    padding: 19px 100px 5px 90px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: linear-gradient(183deg, rgba(76,27,133,1) 17%, rgba(184,72,213,1) 50%, rgba(49,15,84,1) 87%);
        span {
            color: #fff;
        }
    }
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
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
export const WrapperText = styled.div`
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-top: 20px;
    margin-left: 50px;
    font-size: 20px;
    font-weight: bold;
    color: rgb(76,27,133);
`