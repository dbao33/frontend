import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/userSlide'
import productReducer from './slides/ProductSlice'
import orderReducer from './slides/orderSlice'

export default configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
    },
})