import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/indexRoutes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import jwt_decode from 'jwt-decode'
import { isJsonString } from './untils'
import { updateUser } from './redux/slides/userSlide'
import { useDispatch } from 'react-redux'
import * as UserService from './services/UserService'

function App() {

  const dispatch = useDispatch()

  const handleDecoded = () => {

    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    // console.log('response.data,a[pp', storageData)
    return { storageData, decoded }

  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
      // console.log('response.data,a[pp', data)
    }

    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error)
  })
  const handleGetDetailsUser = async (id, token) => {
    // lay duoc du lieu tu backend
    const response = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...response?.data, access_token: token }))
  }

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }

  }, [])

  const fetchApi = async () => {
    const respone = await axios.get(`http://localhost:5000/v1/api/product/get-all-products`)
    // const respone = await axios.get(`${process.env.REACT_API_URL_BE}/product/get-all-products`)

    return respone.data
  }
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)
  return (

    < div >
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div >
  )
}
export default App