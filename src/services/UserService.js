import axios from 'axios'

export const UserLogin = async (data) => {
    const response = await axios.post(`http://localhost:5000/v1/api/user/sign-in`, data)
    return response.data
}
export const UserSignUp = async (data) => {
    const response = await axios.post(`http://localhost:5000/v1/api/user/sign-up`, data)
    return response.data
}
export const getDetailsUser = async (id, access_token) => {
    const response = await axios.get(`http://localhost:5000/v1/api/user/get-details-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return response.data
}