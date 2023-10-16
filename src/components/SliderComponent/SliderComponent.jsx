import React from 'react'
import { Image } from 'antd'
import { WrapperSlider } from './style'

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000

    }
    return (
        <WrapperSlider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image key={image} src={image} alt='silder' preview={false}
                        width='100%' height='274px' />
                )
            })}
        </WrapperSlider>
    )
}

export default SliderComponent