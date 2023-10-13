import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtonInputSearch = (props) => {
  const { 
    size, placeholder, textButton,
    bordered, backgroundColorInput = '#fff',
    backgroundColorButton = '#fff',
    colorButton = '#000'
  } = props
  
  return (
    <div style={{ display: 'flex', }}>
      <InputComponent
        size={size} 
        placeholder={placeholder}
        bordered={bordered}
        style={{
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          backgroundColor: backgroundColorInput
        }}
      />
      
      <ButtonComponent
        size={size}  
        style={{ 
          background: backgroundColorButton,
          border: !bordered && 'none',
          borderTopLeftRadius: '0', 
          borderBottomLeftRadius: '0' 
        }}  
        icon={<SearchOutlined />}
        textButton={textButton}
        styleButton={{ color: colorButton }}
      />
    </div>
    
  )
}

export default ButtonInputSearch