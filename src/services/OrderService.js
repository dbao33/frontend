import { axiosJWT } from './UserService'


export const CreateOrder = async (data, access_token) => {
  const response = await
    axiosJWT.post(`http://localhost:3000/v1/api/order/create-order`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        }
      }
    )
  return response.data
}

export const getOrderByUserId = async (id, access_token) => {
  const response = await
    axiosJWT.get(`http://localhost:3000/v1/api/order/get-all-order-details/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        }
      })
  return response.data
}

export const getAllOrder = async (access_token) => {
  const response = await
    axiosJWT.get(`http://localhost:3000/v1/api/order/get-all-order`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        }
      })
  return response.data
}

export const getDetailsOrder = async (id, access_token) => {
  const response = await
    axiosJWT.get(`http://localhost:3000/v1/api/order/get-order-details/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        }
      })
  return response.data
}
//   sao lại hoán đổi vị trí ?

export const cancelOrder = async (id, access_token, orderItems) => {
  const response = await
    axiosJWT.delete(`http://localhost:3000/v1/api/order/cancel-order/${id}`,
      { data: orderItems },
      {
        headers: {
          token: `Bearer ${access_token}`,
        }
      })
  return response.data
}