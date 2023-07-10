import Footer from './Components/Footer'
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'

function App() {
  return (
    <div>
      <Header />
      {/* <Routes>
        <Route path='/' element={<Home />} />
      </Routes> */}
      <ProductList />
      <Footer />
    </div>
  )
}

export default App
