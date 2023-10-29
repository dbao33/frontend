import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
<<<<<<< HEAD
    id : '',
=======
    id: '',
    isAdmin: false,

>>>>>>> 042a1f2a122311ca9c412de78bf46c25731f0891
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
<<<<<<< HEAD
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


=======
            const { name = '', email = '', access_token = '', address = '',
                phone = '', avatar = '', _id = '', isAdmin } = action.payload

            state.name = name || email
            state.email = email
            state.address = address
            state.phone = phone
            state.avatar = avatar
            state.id = _id ? _id : state.id
            state.access_token = access_token
            state.isAdmin = isAdmin
        },
        resetUser: (state) => {
            state.name = ''
            state.email = ''
            state.address = ''
            state.phone = ''
            state.avatar = ''
            state.id = ''
            state.access_token = ''
            state.access_token = false
>>>>>>> 042a1f2a122311ca9c412de78bf46c25731f0891
        },
    },
})

export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer