import axios from 'axios'

export const axiosJWT = axios.create()

export const UserLogin = async (data) => {
    const response = await axios.post(`http://localhost:3000/v1/api/user/sign-in`, data)
    return response.data
}
export const UserSignUp = async (data) => {
    const response = await axios.post(`http://localhost:3000/v1/api/user/sign-up`, data)
    return response.data
}
export const getDetailsUser = async (id, access_token) => {
    const response = await
        axiosJWT.get(`http://localhost:3000/v1/api/user/get-details-user/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    return response.data
}

export const refreshToken = async () => {
    const response = await axios.post(`http://localhost:3000/v1/api/user/refresh-token`, {
        headers: {
            withCredentials: true
        }
    })
    return response.data
}

export const logOutUser = async () => {
    const response = await axios.post(`http://localhost:3000/v1/api/user/log-out`, {
        headers: {
            withCredentials: true
        }
    })
    return response.data
}