import React, { useEffect, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent.jsx'
import slider_2 from '../../assets/images/slide_1.jpg'
import slider_1 from '../../assets/images/slide_2.jpg'
import slider_4 from '../../assets/images/slide_3.jpg'
import slider_5 from '../../assets/images/slide_4.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col } from 'antd'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/valueDebounce'
import './expandable-iframe.css'
import FooterComponent from '../../components/FooterComponent/FooterComponent.jsx'

const HomePage = () => {

    // fillter
    const SearchProduct = useSelector((state) => state?.product?.search)
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    const searchDebounce = useDebounce(SearchProduct, 1000)
    // const arr = ['LENOVO', 'ASUS', 'HP', 'DELL']

    const [limit, setLimit] = useState(5)
    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const response = await ProductService.getAllProduct(search, limit)
        return response
    }

    const { isLoading, data: products, isPreviousData } = useQuery(
        ['products', limit, searchDebounce],
        fetchProductAll,
        {
            retry: 3,
            retryDelay: 1000,
            keepPreviousData: true,
        }
    )
    const [typeProduct, setTypeProduct] = useState([])
    // get type product
    const fetchTypeProduct = async () => {
        const response = await ProductService.getAllTypeProducts()
        if (response?.status === 'OK') {
            setTypeProduct(response?.data)
        }
    }
    // get type product
    useEffect(() => {
        fetchTypeProduct()
    }, [])

    return (
        <>
            <LoadingComponent isLoading={isLoading || isLoadingSearch}>
                <div style={{ padding: '0 120px', margin: '0 auto' }}>
                    <WrapperTypeProduct >
                        {typeProduct.map((item) => {
                            return (
                                <TypeProduct name={item} key={item} />
                            )
                        })}
                    </WrapperTypeProduct>

                </div>

                <div className='body' style={{ width: '100%', backgroundColor: '#fff' }}>
                    <div id='container' style={{ width: '100%', margin: '0 auto' }}>
                        <SliderComponent arrImages={[slider_1, slider_2, slider_4, slider_5]} />
                        <WrapperProducts>

                            <WrapperProducts
                                gutter={{
                                    xs: 8,
                                    sm: 8,
                                    md: 8,
                                    lg: 8,
                                }} style={{ justifyContent: 'center' }}
                            >
                                {products?.data?.map((product) => {
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
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '20px' }}>
                            <WrapperButtonMore
                                textButton={isPreviousData ? 'Xem Thêm' : 'Xem Thêm'}
                                type='outline'
                                styleButton={{
                                    border: '1px solid rgb(76,27,133)',
                                    width: '240px',
                                    height: '38px', borderRadius: '4px',
                                    color: `${products?.total === products?.data?.length
                                        ? '#ccc'
                                        : 'rgb(76,27,133)'
                                        }`,
                                }}
                                styleTextButton={{
                                    fontWeight: 500,
                                    color: products?.total === products?.data?.length && '#fff'
                                }}
                                disabled={
                                    products?.total === products?.data?.length || products?.totalPages === 1}
                                onClick={() => setLimit((prev) => prev + 5)}
                            />

                        </div>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}
                        >
                            <iframe
                                className='expandable-iframe'
                                src='https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d23651.30408792001!2d106.62409558413344!3d10.868459536359174!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1690950899112!5m2!1svi!2s'
                                allowFullScreen=''
                                loading='lazy'
                                width='300'
                                height='250'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </LoadingComponent>
            <FooterComponent />
        </>
    )
}

export default HomePage