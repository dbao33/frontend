import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent.jsx'
import slider_2 from '../../assets/images/slider_2.webp'
import slider_1 from '../../assets/images/slider_1.png'
import slider_4 from '../../assets/images/slider_4.jpg'
import slider_5 from '../../assets/images/slider_5.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col } from 'antd'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/useDebounce'

const HomePage = () => {

    // fillter
    const SearchProduct = useSelector((state) => state?.product?.search)
    const refSearch = useRef()
    const [stateProduct, setStateProduct] = useState([])
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const searchDebounce = useDebounce(SearchProduct, 1000)
    const arr = ['LENOVO','ASUS', 'HP', 'DELL']

    const fetchProductAll = async (search) => {
        const response = await ProductService.getAllProducts(search)
        if (search?.length > 0 || refSearch.current) {
            setStateProduct(response?.data)
        } else {
            return response
        }
    }

    const { isLoading, data: products } = useQuery(
        ['products'],
        fetchProductAll,
        {
            retry: 3,
            retryDelay: 1000,
        }
    )

    useEffect(() => {
        if (refSearch.current) {
            setIsLoadingSearch(true)
            fetchProductAll(searchDebounce)
        }
        refSearch.current = true
        setIsLoadingSearch(false)
    }, [searchDebounce])

    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data)
        }
    }, [products])
    return (
        <>
            <LoadingComponent isLoading={isLoading || isLoadingSearch}>
                <div style={{ padding: '0 120px', margin: '0 auto' }}>
                    <WrapperTypeProduct >
                        {arr.map((item) => {
                            return (
                                <TypeProduct name={item} key={item} />
                            )
                        })}
                    </WrapperTypeProduct>

                </div>

                <div className='body' style={{ width: '100%', backgroundColor: '#fff' }}>
                    <div id='container' style={{ height: '1000px', width: '100%', margin: '0 auto' }}>
                        <SliderComponent arrImages={[slider_1, slider_2, slider_4, slider_5]} />
                        <WrapperProducts>
                            {/* <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent /> */}

                            <WrapperProducts
                                gutter={{
                                    xs: 8,
                                    sm: 8,
                                    md: 8,
                                    lg: 8,
                                }} style={{ justifyContent: 'center' }}
                            >
                                {stateProduct?.map((product) => {
                                    return (
                                        <Col className='gutter-row' span={2 / 4} >
                                            <div>
                                                <CardComponent
                                                    key={product._id}
                                                    countInStock={product.countInStock}
                                                    description={product.description}
                                                    image={product.image}
                                                    name={product.name}
                                                    price={product.price}
                                                    rating={product.rating}
                                                    type={product.type}
                                                    selled={product.selled}
                                                    discount={product.discount}
                                                    id={product._id}
                                                />
                                            </div>
                                        </Col>
                                    )
                                })}
                            </WrapperProducts>
                        </WrapperProducts>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <WrapperButtonMore textButton='Xem Thêm' type='outline' styleButton={{
                                border: '1px solid rgb(5, 5, 7)',
                                color: 'rgb(5, 5, 7)', width: '240px',
                                height: '38px', borderRadius: '4px'
                            }}
                                styleTextButton={{ fontWeight: 500 }} />
                        </div>
                    </div>
                </div>
            </LoadingComponent>
        </>
    )
}

export default HomePage