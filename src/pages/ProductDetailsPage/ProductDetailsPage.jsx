import React from 'react'
import ProductdetailsComponent from '../../components/ProductdetailsComponent/ProductdetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'
const ProductDetailsPage = () => {
  const { id } = useParams()
  const navige = useNavigate()
  const handleHomeClick = () => {
    navige('/')
  }
  return (
    <div style={{ padding: '0 120px', background: '#efefef', height: '100vh' }}>
      <div style={{ margin: '0 auto' }}>
        <span
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
          onClick={handleHomeClick}
        >
          Trang chủ
        </span>
        - chi tiết sản phẩm
      </div>
      <ProductdetailsComponent idProduct={id} />
    </div>
  )
}

export default ProductDetailsPage