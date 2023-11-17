import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh'}}>
      <HeaderComponent />
      <div >
        {children}
      </div>

    </div>

  )
}

export default DefaultComponent