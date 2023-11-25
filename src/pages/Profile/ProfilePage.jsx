import React, { useEffect, useState } from 'react'
import { HeaderProfile, WrapperLabel, WrapperContentProfile, WrapperInput, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import useMutationHooks from '../../hooks/UseMutationHook'
import * as Message from '../../components/Message/Message'
import { updateUser } from '../../redux/slices/userSlice'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../untils'
import { useNavigate } from 'react-router-dom'


const ProfilePage = () => {
    const navige = useNavigate()
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, rests, access_token)
        }
    )

    const dispatch = useDispatch()

    const { data, isLoading, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        setAvatar(user?.password)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            Message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            Message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        // lay duoc du lieu tu backend
        const response = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...response?.data, access_token: token }))
    }

    const handleOnChangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnChangeName = (value) => {
        setName(value)

    }
    const handleOnChangePassword = (value) => {
        setPassword(value)
    }
    const handleOnChangePhone = (value) => {
        setPhone(value)

    }
    const handleOnChangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)
    }
    const handleUpdate = () => {
        if (password) {
            mutation.mutate({ id: user?.id, email, name, password, phone, address, avatar, access_token: user?.access_token })
        } else {
            mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
        }
    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <span
                style={{
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: 'rgb(76,27,133)',
                    marginRight: '5px',
                }}
                onClick={() => {
                    navige('/');
                }}
            >
                Trang chủ
            </span>
            - Profile User
            <HeaderProfile>Thông tin người dùng</HeaderProfile>
            <WrapperContentProfile>
                <WrapperInput>
                    <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                    <InputForm style={{ width: '300px', padding: '8px' }}
                        id='name'
                        value={name}
                        onChange={handleOnChangeName}
                    />
                    {/* <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            border: '1px solid rgb(76,27,133)',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhập'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent> */}
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='password'>Mật khẩu</WrapperLabel>
                    <InputForm style={{ width: '300px', padding: '8px' }}
                        id='password'
                        value={password}
                        onChange={handleOnChangePassword}
                    />
                    {/* <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            border: '1px solid rgb(76,27,133)',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhập'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent> */}
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                    <InputForm style={{ width: '300px', padding: '8px' }}
                        id='email'
                        value={email}
                        onChange={handleOnChangeEmail}
                    />
                    {/* <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            border: '1px solid rgb(76,27,133)',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhập'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent> */}
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                    <InputForm style={{ width: '300px', padding: '8px' }}
                        id='phone'
                        value={phone}
                        onChange={handleOnChangePhone}
                    />
                    {/* <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            border: '1px solid rgb(76,27,133)',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhập'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent> */}
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                    <InputForm style={{ width: '300px', padding: '8px' }}
                        id='address'
                        value={address}
                        onChange={handleOnChangeAddress}
                    />
                    {/* <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            border: '1px solid rgb(76,27,133)',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhập'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent> */}
                </WrapperInput>
                <WrapperInput>
                    <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                    <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </WrapperUploadFile>
                    {/* /* <InputForm style={{ width: '300px'}}
                            id= 'avatar'
                            value={avatar}
                            onChange={handleOnChangeAvatar}
                    /> */ }
                    {avatar && (
                        <img src={avatar} style={{
                            height: '60px',
                            width: '60px',
                            borderRadius: '50%',
                            ObjectFit: 'cover',
                        }} alt='avatar' />
                    )}
                    <ButtonComponent
                        onClick={handleUpdate}
                        size={40}
                        styleButton={{
                            height: '30px',
                            border: '1px solid rgb(76,27,133)',
                            width: 'fit-content',
                            borderRadius: '4px',
                            padding: '2px 6px 6px'
                        }}
                        textButton={'Cập nhập'}
                        styleTextButton={{ color: 'rgb(76,27,133)', fontSize: '15px', fontWeight: '700' }}
                    ></ButtonComponent>
                </WrapperInput>
            </WrapperContentProfile>
        </div>
    )
}

export default ProfilePage