import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    const { placeholder, style, ...rests } = props
    const handleOnChangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <>
            <WrapperInputStyle
                placeholder={placeholder}
                value={props.value}
                style={style}
                {...rests}
                onChange={handleOnChangeInput}
            />
        </>
    )
}

export default InputForm