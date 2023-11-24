import styles from 'styled-components'
import { Row } from 'antd'

export const FooterList = styles.ul`
    font-size: 22px;
    padding: 10px 0;
    color: rgb(76,27,133);
    font-weight: bold;
`
export const FooterItem = styles.li`
    display: block;
    font-size: 14px;
    padding: 10px 0;
    color: #666;
`
export const ContainerFooter = styles.div`

    background: #fff;
    padding: 20px 120px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 30px ;
    border-top: 1px solid rgb(76,27,133);
    margin-top: 20px;
    @media (max-width:1023px) {
        padding: 20px;
        display: block;
    }
`
export const WrapperFooter = styles(Row)`
    margin-top: 30px;
    @media (max-width:1023px) {
        padding: 20px;
    }
`