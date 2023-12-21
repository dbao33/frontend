import React, { useEffect, useState } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { WrapButton, WrapperProducts } from './style'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'


const TypeProductPage = () => {

    const navige = useNavigate()
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState([])


    // phân trang
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 5,
        total: 1,
    })
    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }
    const fetchProductType = async (type, page, limit) => {
        const response = await ProductService.getProductAllTypes(type, page, limit)
        if (response?.status === 'OK') {
            setIsLoading(false)
            setProduct(response?.data)
            setPanigate({ ...panigate, total: response?.totalPages })
        } else {
            setIsLoading(true)
        }
    }
    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])

    const [sortOption, setSortOption] = useState('') // Tùy chọn sắp xếp đã chọn
    const [sortedProduct, setSortedProduct] = useState([]) // Danh sách sản phẩm đã được sắp xếp
    // Sắp xếp sản phẩm theo giá từ thấp đến cao
    const sortProductByPriceAsc = (products) => {
        return products.sort((a, b) => a.price - b.price)
    }

    // Sắp xếp sản phẩm theo giá từ cao đến thấp
    const sortProductByPriceDesc = (products) => {
        return products.sort((a, b) => b.price - a.price)
    }

    // lọc sản phẩm

    const handleFilterMin = () => {
        setSortOption('asc')
        const sorted = sortProductByPriceAsc(product) // Sắp xếp sản phẩm đã lọc theo giá từ thấp đến cao
        setSortedProduct(sorted)
    }
    const handleFilterMax = () => {
        setSortOption('desc')
        const sorted = sortProductByPriceDesc(product) // Sắp xếp sản phẩm đã lọc theo giá từ thấp đến cao
        setSortedProduct(sorted)
    }
    return (
        <LoadingComponent isLoading={isLoading}>
            <div style={{
                padding: '40px auto',
                // backgroundColor: 'rgba(90, 30, 135, 0.05)',
                height: '100vh',
                alignItems: 'center',
                margin: '0 auto',
                width: '100%',
            }}>
                <span
                    style={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: 'rgb(76,27,133)',
                        marginLeft: '40px',
                    }}
                    onClick={() => {
                        navige('/')
                    }}
                >
                    Trang chủ
                </span>
                - Loại sản phẩm



                <Row
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >

                    <Col xs={24} xl={24}>
                        <div
                            style={{
                                background: '#fff',
                                borderRadius: '4px 0 0 4px',
                                width: 'fit-content',
                                height: 'fit-content',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                paddingLeft: '90px',
                                gap: '20px',
                            }}
                        >
                            {/* <NavBarComponent /> */}
                            {/* min */}
                            <WrapButton onClick={handleFilterMin}>
                                Giá thấp-cao
                            </WrapButton>
                            {/* max */}
                            <WrapButton onClick={handleFilterMax}>
                                Giá cao-thấp
                            </WrapButton>
                            {/* không lọc */}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginTop: '20px',
                            }}
                        >
                            <WrapperProducts gutter={[10, 10]}>
                                {sortedProduct.length > 0
                                    ? sortedProduct.map((data) => {
                                        // Hiển thị các thành phần sản phẩm
                                        return (
                                            <Col className='gutter-row' span={2 / 4}>
                                                <div>
                                                    <CardComponent key={data._id}
                                                        countInStock={data.countInStock}
                                                        description={data.description}
                                                        image={data.image}
                                                        name={data.name}
                                                        price={data.price}
                                                        rating={data.rating}
                                                        type={data.type}
                                                        selled={data.selled}
                                                        discount={data.discount}
                                                        id={data._id}
                                                    />
                                                </div>
                                            </Col>
                                        )
                                    })
                                    :
                                    product?.map((data) => {
                                        return (
                                            <Col className='gutter-row' span={2 / 4}>
                                                <div>
                                                    <CardComponent key={data._id}
                                                        countInStock={data.countInStock}
                                                        description={data.description}
                                                        image={data.image}
                                                        name={data.name}
                                                        price={data.price}
                                                        rating={data.rating}
                                                        type={data.type}
                                                        selled={data.selled}
                                                        discount={data.discount}
                                                        id={data._id}
                                                    />
                                                </div>
                                            </Col>
                                        )
                                    }
                                    )
                                }
                            </WrapperProducts>
                        </div>
                        <Row>
                            <Col span={20}>
                                <Pagination
                                    defaultCurrent={panigate?.page + 1}
                                    total={panigate?.total}
                                    onChange={onChange}
                                    style={{ textAlign: 'center', marginTop: '10px' }}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        </LoadingComponent>
    )
}

export default TypeProductPage