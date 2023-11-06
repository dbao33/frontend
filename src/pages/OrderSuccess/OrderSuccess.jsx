import React from 'react'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useLocation } from 'react-router-dom'
import { WrapperInfo } from '../OrderPage/style'
import { LableStyle } from '../PaymentPage/style'
import { WrapperContainer, WrapperItemOrder, WrapperItemOrderInfo, WrapperValue } from './style'
import { convertPrice } from '../../untils'
import { orderContant } from '../../components/Steps/contant'
const PaymentPage = () => {
  const location = useLocation()
  const { state } = location
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <LoadingComponent isLoading={false}>

        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3>Đơn hàng đã đặt thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>

              <WrapperInfo>
                <div>
                  <LableStyle>Phương thức giao hàng</LableStyle>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                      {orderContant.delivery[state?.delivery]}
                    </span>
                    {orderContant.detail[state?.delivery]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <LableStyle>Phương thức thanh toán</LableStyle>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>

              {/* <WrapperInfo> */}
              <WrapperItemOrderInfo>
                {state?.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                        <div style={{
                          width: 260,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <div>
                <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPrice)}</span>
              </div>
              {/* </WrapperInfo> */}
            </WrapperContainer>

          </div>
        </div>
      </LoadingComponent >
    </div >
  )
}
export default PaymentPage