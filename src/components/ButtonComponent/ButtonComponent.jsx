import { Button } from 'antd'
import React from 'react'


const ButtonComponent = ({ size, bordered, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
    return (
        <Button
            size={size}
            style={{
                ...styleButton,
                background: disabled ? 'rgba(204, 204, 204, 0.5)' : styleButton.background
            }}
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>

    )
}

export default ButtonComponent