import React from 'react'
import ProductdetailsComponent from '../../components/ProductdetailsComponent/ProductdetailsComponent'
import { useParams } from 'react-router-dom'
const ProductDetailsPage = () => {
  const { id } = useParams()

  return (
    <div style={{ padding: '0 120px', background: '#fff', height: '100vh' }}>
      <ProductdetailsComponent idProduct={id} />
    </div>
  )
}

export default ProductDetailsPage