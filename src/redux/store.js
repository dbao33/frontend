import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/userSlide'
import productReducer from './slides/ProductSlice'

export default configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    },
})