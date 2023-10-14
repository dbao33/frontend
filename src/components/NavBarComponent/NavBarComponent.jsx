import React from 'react'
import {
    WrapperContent,
    WrapperLabelText, WrapperTextPrice, WrapperTextValue
} from './style'
import {Checkbox, Rate }  from 'antd'
const NavBarComponent = () => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                        return (
                            <WrapperTextValue>{option}</WrapperTextValue>
                        )    
                })
            case 'checkbox':
                return (
                <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                    {options.map((option) => {
                        return (
                            <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                            
                        )
                    })}
                        
                </Checkbox.Group>
                ) 
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{display:'inline-block'}}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span style={{ marginLeft: '5px'}}> từ {option} sao</span>
                        </div>
                        
                    )  
                })
            case 'price':
                return options.map((option) => {
                    
                    return (  
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )  
                })
            default:
                return <></>
        }
    }
    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['ASSUS', 'HP', 'DELL','Lenovo'])}
                {renderContent('checkbox', [
                    { value: 'a', label: 'a' },
                    { value: 'b', label: 'b' }
                    
                ])}
                {renderContent('star', [3, 4, 5])}
                {renderContent('price', [6,7 ,8])}
            </WrapperContent>
            
        </div>   
    )
}

export default NavBarComponent