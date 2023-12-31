import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import axios from 'axios'
import { useEffect, useState } from "react";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { notifyError } from "../../components/Toaster/Toaster.js";
import {REACT_APP_SERVER_URL} from '../../../config.ts'
import logo from '../../assets/logook.png'
import { setNumberCart } from "../../redux/slices/productsSlice.ts";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  interface Product {
    _id: string;
  }

  interface Category {
    categoryName: string;
    products: Product[];
    id: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [userName, setUserName] = useState("");

  const {numberCart} = useAppSelector(state => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${REACT_APP_SERVER_URL}/categories`);
        setCategories(response.data);
      } catch (error: any) {
        notifyError(error.response.data);
      }
    };
    fetchCategories();
    if (document.cookie) {
      const tokenCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const token = tokenCookie?.split("=")[1];
      if (token) localStorage.setItem("token", token);
      const userCookie = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("user="));
      if (userCookie) {
        const userJSON = decodeURIComponent(userCookie.split("=")[1]);
        const userOk = JSON.parse(userJSON);
        localStorage.setItem("userData", JSON.stringify(userOk));
        dispatch(setUser(userOk));
      }
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
      if (token) navigate("/home");
    }
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const storedUserDataOk = JSON.parse(storedUserData);
      setUserName(storedUserDataOk.name);
    }
  }, [dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(setNumberCart(0))
    navigate('/');
  };
  return (
    categories && (
      <div className={styles.navbar_container}>
        <img
          src={logo}
          className={styles.navbar_logo}
          alt="logo"
          onClick={() => navigate("/home")}
        />
        <div className={styles.navbar_items}>
          <div className={styles.navbar_options}>
            <NavLink
              to="/products"
              className={
                pathname === "/products"
                  ? styles.navbar_button_active
                  : styles.navbar_button
              }
            >
              Productos
            </NavLink>
            <NavLink
              className={
                pathname === "/about"
                  ? styles.navbar_button_active
                  : styles.navbar_button
              }
              to="/about"
            >
              Sobre Nosotros
            </NavLink>
          </div>
          {pathname !== '/myprofile' ? <SearchBar /> : <div className={styles.div_white}></div>}
          <div className={styles.navbar_icons}>
            {userName && <p>{`¡Hola ${userName}!`}</p>}
            {userName && (
              <div
                className={styles.navbar_icon}
                onClick={() => navigate("/myprofile")}
              >
                <CgProfile size={25} />
                <span>Mi perfil</span>
              </div>
            )}
            {userName ? (
              <div className={styles.navbar_icon} onClick={handleLogout}>
                <BiLogIn size={25} />
                <span>Salir</span>
              </div>
            ) : (
              <div
                className={styles.navbar_icon}
                onClick={() => navigate("/login")}
              >
                <BiLogIn size={25} />
                <span>Ingresar</span>
              </div>
            )}
            <div
              className={styles.navbar_icon}
              onClick={() => navigate("/cart")}
            >
              <AiOutlineShoppingCart size={25} />
              <span className={styles.cart_number}>{numberCart > 0 && `${numberCart}`}</span>
              <span>Carrito</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default NavBar;
