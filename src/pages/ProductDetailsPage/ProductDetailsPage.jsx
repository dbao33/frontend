import React from 'react'
import ProductdetailsComponent from '../../components/ProductdetailsComponent/ProductdetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'
import './css.css'
const ProductDetailsPage = () => {
  const { id } = useParams()
  const navige = useNavigate()
  return (
    <div style={{ padding: '0 120px', background: '#fff', height: '100vh' }}>
      <span
        className='mobile-only'
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
        Trang chủ -
      </span>
      Chi tiết sản phẩm
      <ProductdetailsComponent idProduct={id} />
    </div>
  )
}

export default ProductDetailsPage