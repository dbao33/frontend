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