'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetails from '@/components/ProductDetails'
import Cart from '@/components/Cart'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetails productId={productId} />
      <Footer />
      <Cart />
    </main>
  )
}

