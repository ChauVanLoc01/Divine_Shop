import Footer from './Components/Footer'
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='search' element={<ProductList />} />
          <Route path=':productId' element={<ProductDetail />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
