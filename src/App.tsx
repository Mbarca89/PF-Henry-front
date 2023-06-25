import './App.css'
import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Detail from './views/Detail/Detail'
import Products from './views/Products/Products'
import Landing from './views/Landing/Landing'
import About from './views/About/About'
import Profile from './views/Profile/Profile'
import Login from './views/Login/Login'
import { Routes, Route, Outlet } from 'react-router-dom'
import Cart from './views/Cart/Cart'
import Checkout from './views/Checkout/Checkout'
import Success from './views/Success/Success'
import Failure from './views/Failure/Failure'

function App() {

  return (
    <div className="App">
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
        <Route path='/' element={<Landing />} />
      </Routes>
    </div>
  )
}
export default App
