import axios from 'axios'


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