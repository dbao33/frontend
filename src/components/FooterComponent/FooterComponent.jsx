import { Col, Divider, Row } from 'antd'
import React from 'react'
import {
    FacebookFilled, GithubFilled, MailFilled,
    PhoneFilled, FlagFilled
} from '@ant-design/icons'
import { FooterItem, FooterList } from './style'
const FooterComponent = () => {
    return (
        <div style={{ background: '#ccc', padding: '20px 120px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
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
                        color: '#989393'
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
                    <FooterList>Trụ sở chính</FooterList>
                    {/* <FooterItem>
                        <FlagFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>Thủ Đô Hà Nội</span>
                    </FooterItem> */}
                    <FooterItem>
                        <FlagFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>Thành Phố Hồ Chí Minh</span>
                    </FooterItem>
                </Col>
                <Col span={6}>
                    <FooterList>Liên Hệ</FooterList>
                    <FooterItem>
                        <MailFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>2051120207@ut.edu.vn</span>
                    </FooterItem>
                    <FooterItem>
                        <PhoneFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>0123456789</span>
                    </FooterItem>
                </Col>
                <Col span={6}>
                    <FooterList>Mạng Xã Hội</FooterList>
                    <FooterItem>
                        <FacebookFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>SRuy</span>
                    </FooterItem>
                    <FooterItem>
                        <GithubFilled style={{
                            color: '#000',
                            paddingRight: '5px', fontSize: '15px'
                        }} />
                        <span>SRuy</span>
                    </FooterItem>
                </Col>
            </Row>
            <Divider />
        </div>
    )
}

export default FooterComponent