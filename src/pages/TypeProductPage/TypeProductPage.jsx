import React, { useEffect, useState } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { WrapButton, WrapperProducts } from './style'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useSelector } from 'react-redux'
import { useDebounce } from '../../hooks/valueDebounce'

const TypeProductPage = () => {

    const navige = useNavigate()
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState([])

    // state search
    const SearchProduct = useSelector((state) => state?.product?.search)
    // thời gian chờ
    const searchDebounce = useDebounce(SearchProduct, 500)
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
    // lọc sản phẩm
    const [filterRedProduct, setFilterRedProduct] = useState(product)
    const [stateFilter, setstateFilter] = useState(false)
    // hàm lọc sản phẩm nhỏ hơn 5 triệu
    const handleStateClick = () => {
        setstateFilter(false)
    };
    const filterProductMin = (product, value) => {
        return product.filter((item) => {
            return item.price <= value;
        });
    };
    const handleFilterMin = () => {
        setstateFilter(true)
        const value = 20000000;
        const filtered = filterProductMin(product, value);
        setFilterRedProduct(filtered);
    };
    // hàm lọc sản phẩm lớn hơn 5 triệu
    const filterProductMax = (product, value) => {
        return product.filter((item) => {
            return item.price >= value;
        });
    };
    const handleFilterMax = () => {
        setstateFilter(true)
        const value = 20000000;
        const filtered = filterProductMax(product, value);
        setFilterRedProduct(filtered);
    };
    useEffect(() => {
        if (!stateFilter) {
            setFilterRedProduct(product)
        } else {
            setFilterRedProduct(filterRedProduct)
        }
    })
    return (
        <LoadingComponent isLoading={isLoading}>
            <span
                style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: 'rgb(76,27,133)',
                    marginLeft: '40px',
                }}
                onClick={() => {
                    navige('/');
                }}
            >
                Trang chủ
            </span>
            - Loại sản phẩm

            <div style={{
                padding: '40px auto',
                // backgroundColor: 'rgba(90, 30, 135, 0.05)',
                height: '100vh',
                alignItems: 'center',
                margin: '0 auto',
            }}>

                <Row
                    gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                    }}
                >
                    <Col
                        xs={24} xl={7}
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
                        }}
                    >
                        {/* <NavBarComponent /> */}
                        <div>
                            {/* min */}
                            <WrapButton onClick={handleFilterMin}>
                                Sản phẩm có giá nhỏ hơn 20 triệu
                            </WrapButton>
                            {/* max */}
                            <WrapButton onClick={handleFilterMax}>
                                Sản phẩm có lớn nhỏ hơn 20 triệu
                            </WrapButton>
                            {/* không lọc */}
                            <WrapButton onClick={handleStateClick}>
                                Tất cả
                            </WrapButton>
                        </div>
                    </Col>
                    <Col xs={24} xl={17}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginTop: '20px',
                            }}
                        >
                            <WrapperProducts gutter={[10, 10]}>
                                {filterRedProduct?.filter((pro) => {
                                    if (searchDebounce === '') {
                                        return pro
                                    } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                        return pro
                                    }
                                }).map((data) => {
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