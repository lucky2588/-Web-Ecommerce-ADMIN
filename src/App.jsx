import { useState } from 'react'
import './App.css'
import './index.css'
import './database.css'
import './cssOne.css'
import './cssTwo.css'
import './cssThree.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App1.css'
import './portal.scss'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import '../node_modules/bootstrap/dist/js/bootstrap';
import "./assets/fileJS/simple-datatables"
import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout';
import Category from './pages/category/CategoryDetail'
import Order from './pages/order/Order'
import HomePage from './pages/homePage/HomePage';
import Profile from './pages/account/Profile';
import PrivateRoutes from './components/authorizeRoutes/PrivateRoutes'
import Login from './pages/login/Login'
import ListUser from './pages/user/ListUser'
import UserDetail from './pages/user/UserDetail'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import BlogCreate from './pages/blog/BlogCreate'
import NotFound from './pages/not-found/NotFound'
import BlogDetail from './pages/blog/BlogDetail'
import CategoryList from './pages/category/CategoryList'
import CategoryDetail from './pages/category/CategoryDetail'
import CategoryCreate from './pages/category/CategoryCreate'
import BlogList from './pages/blog/BlogList'
import Contract from './pages/notification/Contract'
import SingUp from './pages/login/SingUp'
import ListBrand from './pages/brand/ListBrand'
import BrandDetail from './pages/brand/BrandDetail'
import BrandCreate from './pages/brand/BrandCreate'
import OrderList from './pages/order/OrderList'
import OrderDetail from './pages/order/OrderDetail'
import ListEmail from './pages/email/ListEmail'
import EmailDetail from './pages/email/EmailDetail'
import EmailCreate from './pages/email/EmailCreate'
import ProductList from './pages/product/ProductList'
import ProductCreate from './pages/product/ProductCreate'
import ProductDetail from './pages/product/ProductDetail'
import BlogView from './pages/blog/blogView'
import AuthorizeRoutes from './components/authorizeRoutes/AuthorizeRoutes'
import ResetPassword from './pages/login/ResetPassword'
import Notification from './pages/notification/Notification'
import Comment from './pages/notification/Comment'
import CommentsBlog from './pages/comments/CommentsBlog'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<AuthorizeRoutes requireRoles={["ADMIN", "AUTHOR"]} />} >
            <Route path="/admin" element={<Layout />}>
              <Route index element={<HomePage />} />



              <Route path='user'>
                <Route index element={<ListUser />} />
              
                <Route path=':userId' element={<UserDetail />} />
                <Route path='*' element={<NotFound />} />
              </Route >

              <Route path='order'>
                <Route index element={<OrderList />} />
                <Route path=':orderId' element={<OrderDetail />} />
                <Route path='*' element={<NotFound />} />
              </Route >

              <Route path='Own-product'>
                <Route index element={<ProductList />} />
                <Route path=':productId' element={<ProductDetail />} />
                <Route path='create' element={<ProductCreate />} />
                <Route path='comment' element={<CommentsBlog />} />
                <Route path='*' element={<NotFound />} />
              </Route >

              <Route path='email'>
                <Route index element={<ListEmail />} />
                <Route path=':emailId' element={<EmailDetail />} />
                <Route path='create' element={<EmailCreate />} />
                <Route path='*' element={<NotFound />} />
              </Route >


              <Route path='category'>
                <Route index element={<CategoryList />} />
                <Route path='create' element={<CategoryCreate />} />
                <Route path=':categoryId' element={<CategoryDetail />} />
                <Route path='*' element={<NotFound />} />
              </Route >

              <Route path='brand'>
                <Route index element={<ListBrand />} />
                <Route path=':brandId' element={<BrandDetail />} />
                <Route path='create' element={<BrandCreate />} />
                <Route path='*' element={<NotFound />} />
              </Route >

              <Route path='contact' element={<Contract />} />
              <Route path='notification/:chooseId' element={<Notification />} />
              <Route path='comment' element={<Comment />} />


              <Route path='account'>
                <Route index element={<Profile />} />
              </Route >



              <Route path='register'>
                <Route index element={<SingUp />} />
                <Route path='*' element={<NotFound />} />
              </Route >
              <Route path='*' element={<NotFound />} />
              <Route element={<AuthorizeRoutes requireRoles={["ADMIN", "AUTHOR"]}/>}>
              <Route path='Own-blog'>
                <Route index element={<BlogList />} />
                <Route path='create' element={<BlogCreate />} />
                <Route path='blog/:blogId/:publicId' element={<BlogDetail />} />
                <Route path='comment' element={<CommentsBlog />} />
                <Route path='view/:blogId' element={<BlogView />} />
                <Route path='*' element={<NotFound />} />
              </Route >
            </Route >
            </Route>
           
          </Route>



        </Route>
        <Route path='/login'>
          <Route index element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Route >
        <Route path='/forgetPassword'>
          <Route index element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Route >
        <Route path='*' element={<NotFound />} />

      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>

  )
}

export default App
