import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { useLocation } from 'react-router-dom'
import * as ProductService from '../../services/ProductService'
import { WrapperProducts } from '../HomePage/style'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
const TypeProductPage = () => {

    const onChange = () => { }
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState([])
    const fetchProductType = async (type) => {
        const response = await ProductService.getProductAllTypes(type)
        if (response?.status == 'OK') {
            setProduct(response?.data)
        } else {
            setIsLoading(true)
        }
    }
    useEffect(() => {
        fetchProductType(state)
        setIsLoading(false)
    }, [state])
    return (
        <LoadingComponent isLoading={isLoading}>


            <div style={{
                padding: '0 120px',
                background: '#efefef',
                height: '1000px',
                paddingTop: '40px',
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
                        span={4}
                        style={{
                            background: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '200px',
                            height: 'fit-content',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                    >
                        <NavBarComponent />
                    </Col>
                    <Col span={20}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginTop: '20px',
                            }}
                        >
                            <WrapperProducts gutter={[10, 10]}>
                                {product?.map((data) => {
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
                                    defaultCurrent={2}
                                    total={100}
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