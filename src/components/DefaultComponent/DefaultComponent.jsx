import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <HeaderComponent />
      <div style={{ paddingBottom: '20px' }}>
        {children}
      </div>
      <FooterComponent />
    </div>

  )
}

export default DefaultComponent