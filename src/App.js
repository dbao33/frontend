import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/indexRoutes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  console.log('env', process.env.REACT_API_URL_BE)
  const fetchApi = async () => {
    const respone = await axios.get(`http://localhost:5000/v1/api/product/get-all-products`)
    // const respone = await axios.get(`${process.env.REACT_API_URL_BE}/product/get-all-products`)

    return respone.data
  }
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  console.log('query', query)
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