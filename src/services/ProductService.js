import axios from 'axios'


export const createProduct = async (data) => {
    const response = await
        axios.post(`http://localhost:3000/v1/api/product/create-product`, data)
    return response.data
}
export const getAllProducts = async (search) => {
    let response = {}
    if (search.length > 0) {
        response = await
            axios.get(`http://localhost:3000/v1/api/product/get-all-products?filter=name&filter=${search}`)
    } else {
        response = await
            axios.get(`http://localhost:3000/v1/api/product/get-all-products`)
    }

    return response.data
}