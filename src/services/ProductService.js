import axios from 'axios'
import { axiosJWT } from './UserService'


export const createProduct = async (data) => {
    const response = await
        axios.post(`http://localhost:3000/v1/api/product/create-product`, data)
    return response.data
}
export const getAllProduct = async (search, limit) => {

    let response = {}
    if (search?.length > 0) {
        response = await
            axios.get(`http://localhost:3000/v1/api/product/get-all-products?filter=name&filter=${search}&limit=${limit}`)
    } else {
        response = await
            axios.get(`http://localhost:3000/v1/api/product/get-all-products?limit=${limit}`)
    }
    return response.data
}

export const getDetailsProduct = async (id) => {
    const response = await
        axios.get(`http://localhost:3000/v1/api/product/get-details-product/${id}`)
    return response.data
}

export const updateProduct = async (id, access_token, data) => {
    const response = await
        axiosJWT.put(`http://localhost:3000/v1/api/product/update-product/${id}`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    return response.data
}

export const deleteProduct = async (id, access_token) => {
    const response = await
        axiosJWT.delete(`http://localhost:3000/v1/api/product/delete-product/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    return response.data
}

export const getAllTypeProducts = async () => {
    const response = await
        axios.get(`http://localhost:3000/v1/api/product/get-all-types`)
    return response.data
}

export const getProductAllTypes = async (type, page, limit) => {
    if (type) {
        const response = await
            axios.get(`http://localhost:3000/v1/api/product/get-all-products?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return response.data
    }
}

export const deleteManyProducts = async (data, access_token) => {
    const response = await
        axiosJWT.post(`http://localhost:3000/v1/api/product/delete-many-products/`, data, {
            headers: {
                token: `Bearer ${access_token}`,
            }
        })
    return response.data
}

export const searchProduct = async (keyword) => {
    console.log('keyword', keyword)
    const response = await
        axios.get(`http://localhost:3000/v1/api/product/search?keyword=${keyword}`)
    return response.data
}