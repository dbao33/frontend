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

export const getAllUser = async (admin, access_token) => {
    const response = await
        axiosJWT.get(`http://localhost:3000/v1/api/user/get-all-users/?filter=isAdmin&filter=${admin}`, {
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

export const updateUser = async (id, data, access_token) => {
    const response = await axiosJWT.put(`http://localhost:3000/v1/api/user/update-user/${id}`, data,
        {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    return response.data
}

export const deletedUser = async (id, access_token, data) => {
    const response = await
        axiosJWT.delete(`http://localhost:3000/v1/api/user/delete-user/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    return response.data
}

export const deleteManyUser = async (data, access_token) => {
    const response = await axiosJWT.post(`http://localhost:3000/v1/api/user/delete-many-users`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return response.data
}
