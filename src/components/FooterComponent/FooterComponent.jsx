import { Col, Divider, } from 'antd'
import React from 'react'
import {
    FacebookFilled, GithubFilled, MailFilled,
    PhoneFilled,
} from '@ant-design/icons'
import { ContainerFooter, FooterItem, FooterList, WrapperFooter } from './style'
const FooterComponent = () => {

    const handleFacebookClick = () => {
        window.open('https://www.facebook.com/', '_blank')
    }
    const handleGithubClick = () => {
        window.open('https://www.github.com/', '_blank')
    }
    let src1 = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.1463825844712!2d106.61842849235279!3d10.865322773782708!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b2a11844fb9%3A0xbed3d5f0a6d6e0fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAz!5e0!3m2!1svi!2sus!4v1700181895758!5m2!1svi!2sus'
    return (
        <ContainerFooter>
            <WrapperFooter
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
                <Col style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }} span={6}>
                    <span style={{
                        fontSize: '40px',
                        fontWeight: 'bold',
                        color: 'rgb(76,27,133)',
                        cursor: 'pointer'
                    }}>
                        SRuy
                    </span>
                    <span style={{
                        marginTop: '5px',
                        fontStyle: 'oblique',
                        fontWeight: '300'
                    }}></span>
                </Col>

                <Col xs={24} xl={6}>
                    <FooterList style={{ cursor: 'pointer' }}>Liên Hệ</FooterList>
                    <FooterItem style={{ cursor: 'pointer' }}>
                        <MailFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span style={{ color: '#000' }}>2051120207@ut.edu.vn</span>
                    </FooterItem>
                    <FooterItem style={{ cursor: 'pointer' }}>
                        <PhoneFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span style={{ color: '#000' }}>0123456789</span>
                    </FooterItem>
                </Col>
                <Col xs={24} xl={6} >
                    <FooterList style={{ cursor: 'pointer' }}>Mạng Xã Hội</FooterList>
                    <FooterItem onClick={handleFacebookClick} style={{ cursor: 'pointer' }}>
                        <FacebookFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span style={{ color: '#000' }}>SRuy</span>
                    </FooterItem>
                    <FooterItem style={{ cursor: 'pointer' }} onClick={handleGithubClick} >
                        <GithubFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span style={{ color: '#000' }}>SRuy</span>
                    </FooterItem>
                </Col>

                <Col xs={24} xl={6}>
                    <FooterList style={{ cursor: 'pointer' }}>Địa chỉ</FooterList>

                    <iframe
                        style={{ borderRadius: '8px', }}
                        src={src1}
                        width='300'
                        height='250'
                        allowFullScreen=''
                        loading='lazy'
                    ></iframe>
                </Col >
            </WrapperFooter>
            <Divider />
            <span style={{
                display: 'block',
                textAlign: 'center',
                color: '#8d8d8d',
                fontSize: '12px',
                fontWeight: '400'
            }}>@2023 - Duy Bảo - Trung Hiếu</span>
        </ContainerFooter>
    )
}

export default FooterComponent