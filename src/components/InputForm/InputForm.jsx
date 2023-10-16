import React, { useState } from 'react'
import { WrapperInputStyle } from './style'

const InputForm = ({ placeholder, style, ...rests }) => {
    const [valueInput, setValueInput] = useState('')
    return (
        <>
            <WrapperInputStyle
                placeholder={placeholder}
                valueInput={valueInput}
                style={style}
                {...rests}
            />
        </>
    )
}

export default InputForm