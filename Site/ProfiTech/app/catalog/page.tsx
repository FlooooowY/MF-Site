import Header from '@/components/Header'
import Catalog from '@/components/Catalog'
import Footer from '@/components/Footer'
import Cart from '@/components/Cart'

export default function CatalogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Catalog />
      <Footer />
      <Cart />
    </main>
  )
}

