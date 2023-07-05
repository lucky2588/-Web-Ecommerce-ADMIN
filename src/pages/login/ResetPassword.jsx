import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
  const natigave = useNavigate();
  const [turn, setTurn] = useState(true)
  


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:8888/auth/confirmEmail/${data.email}`);
      toast.success(" Confirm email seccess , we send token to email of you , please check Email !! ")
      setTurn(false)
    } catch (error) {
      // Xử lý lỗi
      alert(error)
    }
  }

  const onSubmit2 = async (data) => {
    if(data.token == ""){
      toast.error("Token is Empty !! ")
    }
    const objPush = {
      email : data.email,
      token : data.token
    }
    try {
      const response = await axios.post(`http://localhost:8888/auth/confirmPassword`,objPush);
      toast.success(" Confirm email seccess , we send token to email of you , please check Email !! ")
      natigave("/login")
    } catch (error) {
      // Xử lý lỗi
      alert(error)
    }
 
  }

  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

      <div className="main">
        <div className="col-12 col-md-12 col-lg-10 auth-main-col text-center p-5">

          <div className="d-flex flex-column align-content-end">
            <div className="app-auth-body mx-auto">
              <div className="app-auth-branding mb-4"><a className="app-logo" href="index.html"><img className="img-thumbnail" height="300px" width="500px" src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1010.jpg?w=2000" alt="logo" /></a></div>
              <h2 className="auth-heading text-center mb-4">Password Reset</h2>
              <div className="auth-intro mb-4 text-center">Enter your email address below. We'll email you a link to a page where you can easily create a new password.</div>
              {turn && (
                <div className="auth-form-container text-left">
                  <form method='Post' onSubmit={handleSubmit(onSubmit)} className="auth-form resetpass-form">
                    <div className="email mb-3">
                      <label className="sr-only" htmlFor="reg-email">Your Email</label>
                      <input id="reg-email" name="reg-email" type="email" className="form-control login-email" placeholder="Your Email" required="required"
                        {...register("email"
                          , {
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            }
                          }
                        )}
                      />
                      {Object.keys(errors).length !== 0 && (
                        <ul>
                          {errors.email?.type === "required" &&
                            <li className='text-danger'>this filed not empty</li>
                          }
                          {errors.email?.type === "pattern" &&
                            <li className='text-danger'>this email not vail !! </li>
                          }
                        </ul>
                      )
                      }
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-block theme-btn mx-auto">Reset Password</button>
                    </div>
                  </form>
                  <div className="auth-option text-center pt-5"><Link to={"/login"} className="app-link btn btn-seccess" href="login.html">Log in</Link>
                  </div>
                </div>
              )
              }

              {
                !turn && (
                  <div className="auth-form-container text-left">
                  <form method='Post' onSubmit={handleSubmit(onSubmit2)} className="auth-form resetpass-form">
                    <div className="email mb-3">
                      <label className="sr-only" htmlFor="reg-email">Token</label>
                      <input name="reg-email" type="text" className="form-control login-email" placeholder="input Token" required="required"
                      {...register("token")}
                      />
                
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary btn-block theme-btn mx-auto">Confirm </button>
                      <br></br>
                     
                    </div>
                  </form>
                  <div className="auth-option text-center pt-5">
                  <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-warning">Send Again </button>
                    <Link to={"/login"} className="app-link btn btn-seccess" href="login.html">Log in</Link>
                  </div>
                </div>
                )
              }



            </div>

          </div>
        </div>

      </div>




    </>
  )
}

export default ResetPassword