import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id: '',
    city: '',
    isAdmin: false,
    refreshToken: '',

}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', address = '',
                phone = '', avatar = '', _id = '', city = '', isAdmin, refreshToken } = action.payload

            state.name = name || email
            state.email = email
            state.address = address
            state.phone = phone
            state.avatar = avatar
            state.city = city
            state.id = _id ? _id : state.id
            state.access_token = access_token
            state.isAdmin = isAdmin
            state.refreshToken = refreshToken
        },
        resetUser: (state) => {
            state.name = ''
            state.email = ''
            state.address = ''
            state.phone = ''
            state.avatar = ''
            state.city = ''
            state.id = ''
            state.access_token = ''
            state.refreshToken = ''
            state.isAdmin = false
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer