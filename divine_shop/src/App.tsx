import Footer from './Components/Footer'
import Header from './Components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import User from './pages/User'
import Profile from './pages/User/Profile'
import Password from './pages/User/Password'
import OrderHistory from './pages/User/OrderHistory'
import FavorateProduct from './pages/User/FavorateProduct'
import MyCmt from './pages/User/MyCmt'
import OrderDetail from './pages/User/OrderHistory/OrderDetail'
import Cart from './pages/Cart'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='search' element={<ProductList />} />
          <Route path=':productId' element={<ProductDetail />} />
          <Route path='user' element={<User />}>
            <Route path='profile' element={<Profile />} />
            <Route path='password' element={<Password />} />
            <Route path='history' element={<OrderHistory />}>
              <Route path=':orderId' element={<OrderDetail />} />
            </Route>
            <Route path='favorate' element={<FavorateProduct />} />
            <Route path='my-cmt' element={<MyCmt />} />
          </Route>
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
