import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Products from './views/Products/Products'
import Landing from './views/Landing/Landing'
import About from './views/About/About'
import Profile from './views/Profile/Profile'
import Login from './views/Login/Login'
import Activation from './views/Activation/Activation'
import NotActive from './views/NotActive/NotActive'
import { Routes, Route, Outlet } from 'react-router-dom'
import Cart from './views/Cart/Cart'
import Checkout from './views/Checkout/Checkout'
import Success from './views/Success/Success'
import Failure from './views/Failure/Failure'
import ResetPassword from './views/ResetPassword/ResetPassword'
import NotFound from './views/NotFound/NotFound'
import Redirect from './components/Redirect/Redirect'
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react'
import { useAppDispatch } from './redux/store'
import { setNumberCart } from './redux/slices/productsSlice'
import { notifyError } from './components/Toaster/Toaster'
import axios from 'axios'
import { REACT_APP_SERVER_URL } from '../config'

function App() {
  const dispatch = useAppDispatch()
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        const storedUserDataOk = JSON.parse(storedUserData)
        setUserData(storedUserDataOk.id);
    }
}, []);

useEffect(() => {
  const getCart = async () => {
      try {
          if(userData){
              const { data } = await axios.get(`${REACT_APP_SERVER_URL}/cart/get/${userData}`)
              dispatch(setNumberCart(data.products.length))
          }
      } catch (error:any) {
          notifyError(error.response.data)
      }
  }
  getCart()
}, [userData, dispatch])

  return (
    <div className="App">
      <Toaster></Toaster>
      <Routes>
        <Route element={(
          <>
            <NavBar />
            <Outlet />
          </>
        )}>
          <Route path='/home' element={<Home />} />
          <Route path='products/:id' element={<Detail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/myprofile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order/:id' element={<Checkout />} />
          <Route path='/success' element={<Success />} />
          <Route path='/failure' element={<Failure />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword/:passwordToken' element={<ResetPassword />} />
        <Route path='/' element={<Landing />} />
        <Route path='/activation/:activationToken' element={<Activation />} />
        <Route path='/notactive' element={<NotActive />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/redirect' element={<Redirect />} />
      </Routes>
    </div>
  )
}
export default App
