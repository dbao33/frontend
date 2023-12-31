import { Radio } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { convertPrice } from '../../untils'
import * as Message from '../../components/Message/Message'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import useMutationHooks from '../../hooks/UseMutationHook'
import * as OrderService from '../../services/OrderService'
import { useNavigate } from 'react-router-dom'
import {
  LableStyle, WrapperRadio, WrapperInfo,
  WrapperLeft, WrapperRight, WrapperTotal,
} from './style'
import { removeAllOrderProduct } from '../../redux/slices/orderSlice'
import * as PaymentService from '../../services/PaymentService'
import { PayPalButton } from 'react-paypal-button-v2'


const PaymentPage = () => {
  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)

  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        deliveredMethod: delivery,
        itemsPrice: priceMemo,
        shippingPrice: DeliveryPriceMemo,
        totalPrice: TotalPriceMemo,
        user: user?.id,
      })
    }
  }



  // gia tri duoc dua vao mutation 
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data
    const response = OrderService.CreateOrder({ ...rests }, token)
    return response
  })

  // mutation
  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      // nếu thành công thì xóa các sản phẩm trong giỏ hàng
      const arrayOrdered = []
      // đẩy các sản phẩm đã chọn vào 1 mảng rỗng
      order?.orderItemsSelected?.forEach((element) => {
        arrayOrdered.push(element.product)
      })
      // gọi đến hành động xóa các sản phẩm và truyền tham số mảng chứa các sản phẩm 
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
      Message.success('Đặt hàng thành công')
      // truyền đi 1 state có chứa các thông tin
      navigate('/order-success', {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSelected,
          totalPrice: TotalPriceMemo,
        }
      })
    } else if (isSuccess) {
      Message.error(dataAdd?.message)
    }
  }, [isSuccess, isError])

  // khi click vao finish thi gia tri nhap vao se duoc luu vao mutation

  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }
  // tính tiền
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount
    }, 0)
    return result
  }, [order])

  const discountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.price * cur.discount * cur.amount) / 100
    }, 0)
    if (Number(result)) {
      return result
    }
    return 0
  }, [order])

  const DeliveryPriceMemo = useMemo(() => {
    if ((priceMemo === 0 && order?.orderItemsSelected?.length === 0) || priceMemo >= 2000000) {
      return 0
    } else if (priceMemo < 500000) {
      return 30000
    } else {
      return 15000
    }
  }, [order])

  const TotalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) + Number(DeliveryPriceMemo) - Number(discountMemo)
    )
  }, [priceMemo, discountMemo, DeliveryPriceMemo])


  const [sdkReady, setSdkReady] = useState(false)
  // paypal
  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig()
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [])
  const onSuccessPayment = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      deliveredMethod: delivery,
      itemsPrice: priceMemo,
      shippingPrice: DeliveryPriceMemo,
      totalPrice: TotalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time
    })
  }
  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <LoadingComponent isLoading={isLoadingAddOrder}>

        <div style={{ height: '100%', width: '100%', margin: '4 auto' }}>

          <div style={{
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'flex',
            paddingLeft: '20px',
          }}>

            Thanh toán
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperLeft>

              <WrapperInfo>
                <div>
                  <LableStyle>Chọn phương thức giao hàng</LableStyle>
                  <WrapperRadio
                    onChange={handleDilivery}
                    value={delivery}
                  >
                    <Radio value='fast'>
                      <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                        FAST
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value='gojek'>
                      <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                        GO_JEK
                      </span>
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value='express'>
                      <span style={{ color: '#ea8500', fontWeight: 'bold' }}>
                        EXPRESS
                      </span>
                      Giao hàng hỏa tốc
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <LableStyle>Chọn phương thức thanh toán</LableStyle>
                  <WrapperRadio
                    onChange={handlePayment}
                    value={payment}
                  >


                    <Radio value='paypal_money'>
                      Thanh toán Paypal
                    </Radio>
                    <Radio value='later_money'>
                      Thanh toán tiền mặt khi nhận hàng
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>

            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: '100%' }}>
                <WrapperInfo>
                  <div>
                    <span>Địa chỉ: </span>
                    <span style={{ fontWeight: 'bold' }}>
                      {`${user?.address} , ${user?.city}`}
                    </span>

                  </div>
                </WrapperInfo>
              </div>

              <div style={{ width: '100%' }}>
                <WrapperInfo>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <span>Tạm tính</span>
                    <span
                      style={{
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>{convertPrice(priceMemo)}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <span>Giảm giá</span>
                    <span
                      style={{
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {convertPrice(discountMemo)}
                    </span>
                  </div>


                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                    <span>Phí giao hàng</span>
                    <span
                      style={{
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      {convertPrice(DeliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>

                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                    <span
                      style={{
                        color: 'rgb(254, 56, 52)',
                        fontSize: '24px',
                        fontWeight: 'bold'
                      }}
                    >
                      {convertPrice(TotalPriceMemo)}
                    </span>
                    <span
                      style={{
                        color: '#000',
                        fontSize: '11px'
                      }}>(Đã bao gồm VAT nếu có)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {/* payment */}
              {payment === 'paypal_money' && sdkReady ? (
                <div style={{
                  width: '320px'
                }}>
                  <PayPalButton
                    amount='0.01'

                    onSuccess={onSuccessPayment}
                    onError={() => {
                      alert('Error')
                    }}
                  />
                </div>
              ) : (
                < ButtonComponent
                  onClick={() => handleAddOrder()}
                  size={40}

                  styleButton={{
                    background: 'linear-gradient(183deg, rgba(76,27,133,1) 17%, rgba(184,72,213,0.938813025210084) 50%, rgba(49,15,84,1) 87%)',
                    height: '48px',
                    width: '100%',
                    borderRadius: '4px',
                    border: 'none',
                    margin: '26px 0 10px'
                  }}

                  styleTextButton={{
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '700'
                  }}
                  textButton={'Đặt hàng'}
                ></ButtonComponent>
              )}
            </WrapperRight>
          </div>
        </div>
      </LoadingComponent>
    </div>
  )
}
export default PaymentPage