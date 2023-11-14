import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/indexRoutes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import jwt_decode from 'jwt-decode'
import { isJsonString } from './untils'
import { updateUser } from './redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from './services/UserService'
import LoadingComponent from './components/LoadingComponent/LoadingComponent'

function App() {

  const [isLoading, setLoading] = useState(false)

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

  const user = useSelector((state) => state.user)

  useEffect(() => {
    setLoading(true)
    const { storageData, decoded } = handleDecoded()

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }

    setLoading(false)

  }, [])

  return (

    < div >
      <LoadingComponent isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              const isCheckAuth = !route.isPrivate || user.isAdmin || ''

              return (

                <Route key={route.path}
                  path={isCheckAuth && route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  } />
              )

            })}
          </Routes>
        </Router>
      </LoadingComponent>


    </div >
  )
}
export default App