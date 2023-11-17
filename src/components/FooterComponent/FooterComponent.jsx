import { Col, Divider, Row } from 'antd'
import React from 'react'
import {
    FacebookFilled, GithubFilled, MailFilled,
    PhoneFilled, PushpinFilled,
} from '@ant-design/icons'
import { FooterItem, FooterList } from './style'
import { useNavigate } from 'react-router-dom'

const FooterComponent = () => {
    const navige = useNavigate()
    const handleAddress = () => {
        navige('/map')
    }
    const handleFacebookClick = () => {
        window.open('https://www.facebook.com/', '_blank')
    }
    const handleGithubClick = () => {
        window.open('https://www.github.com/', '_blank')
    }
    return (
        <div style={{
            background: '#fff',
            padding: '10px 120px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid rgb(76,27,133)'
        }}>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ marginTop: '30px' }}
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
                <Col span={6}>
                    <FooterList style={{ cursor: 'pointer' }}>Địa chỉ của SRuy Shop</FooterList>
                    {/* <FooterItem>
                        <FlagFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>Thủ Đô Hà Nội</span>
                    </FooterItem> */}
                    <FooterItem style={{ cursor: 'pointer', }} onClick={handleAddress}>
                        <PushpinFilled style={{
                            color: '#000',
                            paddingRight: '5px',
                            fontSize: '15px',
                            cursor: 'pointer',
                        }}
                        />
                        <span style={{ color: '#000' }}>Thành Phố Hồ Chí Minh</span>
                    </FooterItem>
                </Col>
                <Col span={6}>
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
                <Col span={6} >
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
            </Row>
            <Divider />
        </div>
    )
}

export default FooterComponent