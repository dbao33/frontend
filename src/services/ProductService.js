import axios from 'axios'

export const getAllProducts = async () => {
    const response = await
        axios.get(`http://localhost:3000/v1/api/product/get-all-products`)
    return response.data
}

export const createProduct = async (data) => {
    const response = await
        axios.post(`http://localhost:3000/v1/api/product/create-product`, data)
    return response.data
}
