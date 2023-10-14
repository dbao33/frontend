import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent.jsx'
import slider_2 from '../../assets/images/slider_2.webp'
import slider_1 from '../../assets/images/slider_1.png'
import slider_4 from '../../assets/images/slider_4.jpg'
import slider_5 from '../../assets/images/slider_5.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
const HomePage = () => {
    const arr = ['ASUS', 'HP', 'DELL']
    return (
        <>
            <div style={{ padding: '0 120px' }}>
                <WrapperTypeProduct >
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })} 
                </WrapperTypeProduct>
                
            </div>
            <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '274px' }}>
                <SliderComponent arrImages={[slider_1, slider_2, slider_4, slider_5]}/>
                <WrapperProducts>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProducts>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperButtonMore textButton='Xem Thêm'  type='outline' styleButton={{
                        border: '1px solid rgb(5, 5, 7)', 
                        color: 'rgb(5, 5, 7)', width: '240px',
                        height: '38px', borderRadius: '4px'
                    }}
                    styleTextButton={{ fontWeight: 500}}  /> 
                </div> 
            </div>
            
        </>
    )
}

export default HomePage