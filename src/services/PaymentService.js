import axios from 'axios'


export const getConfig = async () => {
  const response = await
    axios.get(`http://localhost:3000/v1/api/payment/config`)
  return response.data
}