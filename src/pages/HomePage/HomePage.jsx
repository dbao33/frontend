import React, { useEffect, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperText, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent.jsx'
import slider_2 from '../../assets/images/slide_1.jpg'
import slider_1 from '../../assets/images/slide_2.jpg'
import slider_4 from '../../assets/images/slide_3.jpg'
import slider_5 from '../../assets/images/slide_4.jpg'
import MSI from '../../assets/images/MSI.png'
import lenovo from '../../assets/images/lenovo.png'
import asus from '../../assets/images/asus.png'
import macbook from '../../assets/images/macbook.png'
import dell from '../../assets/images/dell.png'

import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Image, Row } from 'antd'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
// import { useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
// import { useDebounce } from '../../hooks/valueDebounce'
import FooterComponent from '../../components/FooterComponent/FooterComponent.jsx'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()
    // fillter
    // const SearchProduct = useSelector((state) => state?.product?.search)
    const [isLoadingSearch, setIsLoadingSearch] = useState(false)
    // const searchDebounce = useDebounce(SearchProduct, 1000)
    // const arr = ['LENOVO', 'ASUS', 'HP', 'DELL']

    const [limit, setLimit] = useState(5)
    const fetchProductAll = async (context) => {

        const limit = context?.queryKey && context?.queryKey[1]
        // const search = context?.queryKey && context?.queryKey[2]
        const response = await ProductService.getAllProduct('', limit)
        return response
    }

    const { isLoading, data: products, isPreviousData } = useQuery(
        ['products', limit],
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
    // nổi bậc
    const [limit1, setLimit1] = useState(5)
    const fetchProductNB = async (context) => {
        const limit1 = context?.queryKey && context?.queryKey[1]
        // const search = context?.queryKey && context?.queryKey[2]
        const response = await ProductService.getAllProduct('', limit1)
        // const filteredProducts = response?.data?.filter((product) => {
        //     return product?.discount
        // })
        // console.log(filteredProducts)
        return response
    }

    const { loading, data: productnb, isPreviousDataNB } = useQuery(
        ['productnb', limit1],
        fetchProductNB,
        {
            retry: 3,
            retryDelay: 1000,
            keepPreviousData: true,
        }
    )

    const handleNavigateType = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`,
            { state: type }
        )
    }
    return (
        <>
            <LoadingComponent isLoading={isLoading || isLoadingSearch}>
                {/* <div style={{ padding: '0 120px', margin: '0 auto' }}>
                    <WrapperTypeProduct style={{ marginBottom: '10px' }}>
                        {typeProduct.map((item) => {
                            return (
                                <TypeProduct key={item} name={item} />
                            )
                        })}
                    </WrapperTypeProduct>

                </div> */}



                <div className='body' style={{ width: '100%', backgroundColor: '#fff' }}>
                    <div id='container' style={{ width: '100%', margin: '0 auto' }}>


                        <Row
                            gutter={{ xs: 12, sm: 16, md: 24, lg: 32 }}
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Col className="gutter-row"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    margin: '0 5px 10px 5px',
                                    padding: '4px 12px'
                                }}
                                onClick={() => handleNavigateType('Lenovo')}
                            >
                                <Image height={20} src={lenovo} preview={false} />
                            </Col>
                            <Col className="gutter-row"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    margin: '0 5px 10px 5px',
                                    padding: '2px 12px'

                                }}
                                onClick={() => handleNavigateType('MacBook')}
                            >
                                <Image height={25} src={macbook} preview={false} />
                            </Col>
                            <Col className="gutter-row"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    margin: '0 5px 10px 5px',
                                    padding: '4px 12px'

                                }}
                                onClick={() => handleNavigateType('Dell')}
                            >
                                <Image height={20} src={dell} preview={false} />
                            </Col>
                            <Col className="gutter-row"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    margin: '0 5px 10px 5px',
                                    padding: '4px 12px'

                                }}
                                onClick={() => handleNavigateType('Asus')}
                            >
                                <Image height={20} src={asus} preview={false} />
                            </Col>
                            <Col className="gutter-row"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    margin: '0 5px 10px 5px',
                                    padding: '2px 12px'

                                }}
                                onClick={() => handleNavigateType('MSI')}
                            >
                                <Image height={25} src={MSI} preview={false} />
                            </Col>
                        </Row>
                        <SliderComponent arrImages={[slider_1, slider_2, slider_4, slider_5]} />

                        <WrapperText>SẢN PHẨM NỔI BẬC</WrapperText>
                        <WrapperProducts>

                            <WrapperProducts
                                gutter={{
                                    xs: 8,
                                    sm: 8,
                                    md: 8,
                                    lg: 8,
                                }} style={{ justifyContent: 'center' }}
                            >

                                {productnb?.data?.map((product) => {
                                    return (
                                        product?.discount && (
                                            <Col key={product._id} className='gutter-row' span={2 / 4} >
                                                <div >
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
                                    )
                                })}

                            </WrapperProducts>

                        </WrapperProducts>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '20px' }}>
                            <WrapperButtonMore
                                textButton={isPreviousDataNB ? 'Xem Thêm' : 'Xem Thêm'}
                                type='outline'
                                styleButton={{
                                    border: '1px solid rgb(76,27,133)',
                                    width: '240px',
                                    height: '38px', borderRadius: '4px',
                                    color: `${productnb?.total === productnb?.data?.length
                                        ? '#ccc'
                                        : 'rgb(76,27,133)'
                                        }`,
                                }}
                                styleTextButton={{
                                    fontWeight: 500,
                                    color: productnb?.total === productnb?.data?.length && '#fff'
                                }}
                                disabled={
                                    productnb?.total === productnb?.data?.length || productnb?.totalPages === 1}
                                onClick={() => setLimit1((prev) => prev + 5)}
                            />

                        </div>

                        <WrapperText>TẤT CẢ SẢN PHẨM</WrapperText>
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
                                        <Col key={product._id} className='gutter-row' span={2 / 4} >
                                            <div >
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

                    </div>
                </div>
            </LoadingComponent>
            <FooterComponent />
        </>
    )
}

export default HomePage