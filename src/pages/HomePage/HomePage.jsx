import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperTypeProduct } from './style'
const HomePage = () => {
    const arr = ['ASUS', 'HP', 'DELL']
    return (
        <div style={{ padding: '0 120px' }}>HomePage
            <WrapperTypeProduct>
                {arr.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })} 
            </WrapperTypeProduct>
            
        </div>
    )
}

export default HomePage