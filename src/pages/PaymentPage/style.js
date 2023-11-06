import { Radio } from 'antd'
import styles from 'styled-components'


export const LableStyle = styles.span`
  font-size: 12px;
  color: #000;
  font-weight: bold
`


export const WrapperRadio = styles(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`