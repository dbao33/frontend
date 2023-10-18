import axios from 'axios'

export const UserLogin = async (data) => {
    const respone = await axios.post(`http://localhost:5000/v1/api/user/sign-in`, data)
    return respone.data
}
export const UserSignUp = async (data) => {
    const respone = await axios.post(`http://localhost:5000/v1/api/user/sign-up`, data)
    return respone.data
}