import React from 'react'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'

const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{ padding: '0 120px', background: '#efefef' }}>
            {/* <Row style={{ flexWrap: 'nowrap', paddingTop:'10px' }}>
                <WrapperNavbar span={4} >   
                    <NavBarComponent />
                </WrapperNavbar>
                <Col span={20}>
                <WrapperProducts>
                    <CardComponent /> 
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </WrapperProducts>    
                <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', marginTop: '10px'}} />
                </Col>
            </Row> */}
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
                        <Row gutter={[10, 10]}>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                            <Col className='gutter-row' span={2 / 4}>
                                <div>
                                    <CardComponent />
                                </div>
                            </Col>
                        </Row>
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
    )
}

export default TypeProductPage