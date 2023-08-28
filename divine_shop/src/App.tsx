import Footer from './Components/Footer'
import Header from './Components/Header'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
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
import Viewed from './pages/View'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from './store'

export enum Path {
  search = 'search',
  user = 'user',
  profile = 'profile',
  password = 'password',
  history = 'history',
  favorate = 'favorate',
  my_cmt = 'my-cmt',
  cart = 'cart',
  viewed = 'viewed'
}

const PrivateRoute = () => {
  const user = useSelector((state: RootState) => state.UserSliceName.user)
  return user ? <Outlet /> : <Navigate to={'/'} />
}

function App() {
  return (
    <>
      <div className='overflow-hidden'>
        <Header />
        <div>
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path={Path.search} element={<ProductList />} />
              <Route path=':productId' element={<ProductDetail />} />
              <Route path={Path.viewed} element={<Viewed />} />
              <Route path={Path.cart} element={<Cart />} />
              <Route path='' element={<PrivateRoute />}>
                <Route path={Path.user} element={<User />}>
                  <Route path={Path.profile} element={<Profile />} />
                  <Route path={Path.password} element={<Password />} />
                  <Route path={Path.history} element={<OrderHistory />} />
                  <Route path={`${Path.history}/:orderId`} element={<OrderDetail />} />
                  <Route path={Path.favorate} element={<FavorateProduct />} />
                  <Route path={Path.my_cmt} element={<MyCmt />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
