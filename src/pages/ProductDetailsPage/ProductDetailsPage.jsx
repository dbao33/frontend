import React from 'react'
import ProductdetailsComponent from '../../components/ProductdetailsComponent/ProductdetailsComponent'
import { Navigate, useParams } from 'react-router-dom'

const ProductDetailsPage = () => {
  const { id } = useParams()
  return (
    <div style={{ padding: '0 120px', background: '#efefef', height: '100vh' }}>
      <div style={{ margin: '0 auto' }}>
        <span
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => {
            Navigate('/')
          }}
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