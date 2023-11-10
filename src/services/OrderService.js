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