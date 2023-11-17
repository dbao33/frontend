import React, { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/LoadingComponent'
import { useQuery } from '@tanstack/react-query'
import {
  WrapperItemOrder, WrapperListOrder, WrapperStatus,
  WrapperContainer, WrapperHeaderItem, WrapperFooterItem
} from './style'
import { convertPrice } from '../../untils'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Message from '../../components/Message/Message'
import useMutationHooks from '../../hooks/UseMutationHook'

const MyOrderPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const fetchMyOrder = async () => {
    const response = await OrderService.getOrderByUserId(
      state?.id,
      state?.token
    )
    return response.data

  }

  const queryOrder = useQuery(
    { queryKey: ['orders'], queryFn: fetchMyOrder },
    {
      // nếu có id và token của người dùng thì mới được phép gọi tới fetchMyOrder
      enabled: state?.id && state?.token
    })
  const { isLoading, data } = queryOrder
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`,
      {
        state:
        {
          token: state?.token
        }
      })
  }

  const mutationCancel = useMutationHooks((data) => {
    const { id, token, orderItems } = data
    const response = OrderService.cancelOrder(id, token, orderItems)
    return response
  })

  const handleCancelOrder = (order) => {
    mutationCancel.mutate(
      { id: order._id, token: state?.token, orderItems: order?.orderItems },
      {
        onSuccess: () => {
          queryOrder.refetch()
        }
      })
  }
  const {
    data: dataCancel,
    isLoading: isLoadingCancel,
    isError: isErrorCancel,
    isSuccess: isSuccessCancel,
  } = mutationCancel

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      Message.success()
    } else if (isErrorCancel) {
      Message.error()
    }
  }, [isSuccessCancel, isErrorCancel])


  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem>
          <img
            src={order?.image}
            style={{
              width: '70px',
              height: '70px',
              objectFit: 'cover',
              border: '1px solid rgb(238, 238, 238)',
              padding: '2px',
            }}
          />
          <div
            style={{
              width: 260,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: '10px',
            }}
          >
            {order?.name}
          </div>
          <span
            style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}
          >
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      )
    })
  }

  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>

          <div style={{
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'flex',
            paddingLeft: '10px',
          }}>

            Đơn hàng của tôi
          </div>
          <WrapperListOrder>
            {data?.map((order) => {

              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span
                      style={{ fontSize: '14px', fontWeight: 'bold' }}
                    >
                      Trạng thái
                    </span>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>
                        Giao hàng:
                      </span>
                      {`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}
                    </div>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>
                        Thanh toán:
                      </span>
                      {`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}
                    </div>
                  </WrapperStatus>

                  {renderProduct(order?.orderItems)}

                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>
                        Tổng tiền:
                      </span>
                      <span
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                      >
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ButtonComponent
                        // onClick={() => handleAddCard()}
                        onClick={() => handleCancelOrder(order)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(76,27,133)',
                          borderRadius: '4px'
                        }}
                        textButton={'Hủy đơn hàng'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                      <ButtonComponent
                        // onClick={() => handleAddCard()}
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(76,27,133)',
                          borderRadius: '4px'
                        }}
                        textButton={'Xem chi tiết'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage