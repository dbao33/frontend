import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    id : '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', phone = '', address = '', access_token = '', avatar = '', _id = '' } = action.payload
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.address = address;
            state.avatar = avatar;
            state.id = _id;
            state.access_token = access_token;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = ''
            state.access_token = '';
            state.id = '';
            state.address = '';
            state.avatar = '';


        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer